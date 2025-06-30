import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Activity = {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: any;
  created_at: string;
};

export const useActivities = (userId?: string, limit = 10) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setActivities(data || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();

    // Set up real-time subscription
    const subscription = supabase
      .channel('activity_logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs' },
        (payload) => {
          setActivities((prev) => [payload.new as Activity, ...prev].slice(0, limit));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId, limit]);

  return { activities, loading, error, refetch: fetchActivities };
};

export const useLogActivity = () => {
  const logActivity = async ({
    action,
    entityType,
    entityId,
    metadata = {},
  }: {
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Record<string, any>;
  }) => {
    try {
      const { error } = await supabase.from('activity_logs').insert({
        user_id: entityId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        metadata,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error logging activity:', error);
      return { success: false, error };
    }
  };

  return { logActivity };
};
