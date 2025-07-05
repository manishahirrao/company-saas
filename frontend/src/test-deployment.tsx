// This is a test file to verify the deployment is working
console.log('Deployment test: Frontend is working!');

// Add a simple test component
export function TestDeployment() {
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'green',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      zIndex: 9999,
      fontSize: '14px'
    }}>
      Deployment Working!
    </div>
  );
}
