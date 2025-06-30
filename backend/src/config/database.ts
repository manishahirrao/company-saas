import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to run migrations
async function runMigrations() {
  try {
    const migrationFiles = fs.readdirSync(path.join(__dirname, '../../database/migrations'))
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(__dirname, `../../database/migrations/${file}`), 'utf8');
      
      // Split the SQL file into individual statements
      const statements = sql
        .split(';')
        .map(statement => statement.trim())
        .filter(statement => statement.length > 0);
      
      // Execute each statement
      for (const statement of statements) {
        if (statement.toLowerCase().startsWith('create extension')) {
          // Skip extension creation if it already exists
          const extensionName = statement.match(/create extension (?:if not exists )?["']?([^\s'"]+)["']?/i)?.[1];
          if (extensionName) {
            const { data, error } = await supabase.rpc('pg_extension_exists', { extname: extensionName });
            if (error || !data) {
              const { error: createError } = await supabase.rpc('pg_catalog.pg_extension_create', { extname: extensionName });
              if (createError) {
                console.error(`Error creating extension ${extensionName}:`, createError);
                continue;
              }
            }
          }
        } else {
          const { error } = await supabase.rpc('pg_query', { query: statement });
          if (error) {
            console.error(`Error executing statement in ${file}:`, error);
            throw error;
          }
        }
      }
      
      console.log(`Successfully applied migration: ${file}`);
    }
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

// Initialize database connection and run migrations
export async function initializeDatabase() {
  try {
    // Test the connection
    const { data, error } = await supabase.from('users').select('*').limit(1);
    
    if (error && error.code !== '42P01') { // Ignore 'relation does not exist' error
      throw error;
    }
    
    // Run migrations
    await runMigrations();
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Export database utility functions
export const db = {
  // User related queries
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data || null;
  },
  
  async createUser(userData: any) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateUser(id: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Company related queries
  async createCompany(companyData: any) {
    const { data, error } = await supabase
      .from('companies')
      .insert(companyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getCompanyByUserId(userId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },
  
  // Job posting related queries
  async createJobPosting(jobData: any) {
    const { data, error } = await supabase
      .from('job_postings')
      .insert(jobData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getJobPostingsByCompany(companyId: string, status?: string) {
    let query = supabase
      .from('job_postings')
      .select('*')
      .eq('company_id', companyId);
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Generic query builder for other tables
  query: {
    async findOne(table: string, conditions: Record<string, any>) {
      let query = supabase.from(table).select('*');
      
      for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
      }
      
      const { data, error } = await query.single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    },
    
    async findMany(table: string, conditions: Record<string, any> = {}, options: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
    } = {}) {
      let query = supabase.from(table).select('*');
      
      for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
      }
      
      if (options.orderBy) {
        query = query.order(options.orderBy, { 
          ascending: options.orderDirection === 'asc' 
        });
      }
      
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      if (options.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    
    async create(table: string, data: any) {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    
    async update(table: string, id: string, updates: any) {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async delete(table: string, id: string) {
      const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async raw(sql: string, params: any[] = []) {
      const { data, error } = await supabase.rpc('pg_query', { 
        query: sql,
        params: JSON.stringify(params || [])
      });
      
      if (error) throw error;
      return data;
    }
  }
};

export default db;
