import { useState } from 'react'

export default function KeyActions() {
  const [notifications, setNotifications] = useState(3)

  const actions = [
    {
      id: 'profile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: '👤'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Manage your preferences',
      icon: '⚙️'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View detailed reports',
      icon: '📊'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: `${notifications} new messages`,
      icon: '🔔',
      badge: notifications
    },
    {
      id: 'export',
      title: 'Export Data',
      description: 'Download your information',
      icon: '📥'
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'Get assistance',
      icon: '❓'
    }
  ]

  const handleActionClick = (actionId: string) => {
    if (actionId === 'notifications') {
      setNotifications(0)
    }
    console.log(`Action clicked: ${actionId}`)
  }

  return (
    <div style={{ color: 'white', height: '100%' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0 0.5rem 0'
      }}>Quick Actions</h2>
      <p style={{
        fontSize: '0.875rem',
        opacity: 0.8,
        margin: '0 0 1.5rem 0'
      }}>Frequently used features and tools</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              flexShrink: 0,
              fontSize: '1.25rem'
            }}>
              {action.icon}
              {action.badge && action.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  {action.badge}
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '0.25rem'
              }}>
                {action.title}
              </div>
              <div style={{
                fontSize: '0.75rem',
                opacity: 0.8
              }}>
                {action.description}
              </div>
            </div>
            <div style={{
              fontSize: '1rem',
              opacity: 0.5,
              transition: 'all 0.2s ease'
            }}>
              →
            </div>
          </button>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        paddingTop: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          margin: '0 0 1rem 0'
        }}>Recent Activities</h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {[
            { action: 'Profile updated', time: '2 hours ago' },
            { action: 'New login from Chrome', time: '5 hours ago' },
            { action: 'Data export completed', time: '1 day ago' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                flexShrink: 0
              }}></div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.125rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {activity.action}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  opacity: 0.6
                }}>
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
