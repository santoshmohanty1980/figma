interface User {
  email: string
}

interface WelcomeSectionProps {
  user: User
}

export default function WelcomeSection({ user }: WelcomeSectionProps) {
  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getUserName = () => {
    return user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
  }

  return (
    <div style={{
      color: '#1a202c'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        margin: '0 0 0.5rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {getGreeting()}, {getUserName()}! 👋
      </h1>
      <p style={{
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: '0 0 0.5rem 0'
      }}>
        Welcome back to your dashboard. Here's what's happening today.
      </p>
      <div style={{
        fontSize: '0.875rem',
        color: '#9ca3af',
        fontWeight: 500
      }}>
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  )
}
