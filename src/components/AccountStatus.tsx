interface User {
  email: string
}

interface AccountStatusProps {
  user: User
}

export default function AccountStatus({ }: AccountStatusProps) {
  const accountData = {
    status: 'Active',
    memberSince: '2023',
    lastLogin: new Date().toLocaleDateString(),
    totalSessions: 47,
    storageUsed: 2.3,
    storageLimit: 10
  }

  const storagePercentage = (accountData.storageUsed / accountData.storageLimit) * 100

  return (
    <div style={{ color: 'white', height: '100%' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0 1.5rem 0'
      }}>
        Account Status
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: 500 }}>Status</div>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse 2s infinite'
            }}></span>
            {accountData.status}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: 500 }}>Member Since</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{accountData.memberSince}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: 500 }}>Last Login</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{accountData.lastLogin}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: 500 }}>Total Sessions</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{accountData.totalSessions}</div>
        </div>
      </div>

      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            opacity: 0.8
          }}>Storage Used</span>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            {accountData.storageUsed}GB / {accountData.storageLimit}GB
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${storagePercentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>
    </div>
  )
}
