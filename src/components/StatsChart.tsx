import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function StatsChart() {
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map(month => ({
      month,
      users: Math.floor(Math.random() * 1000) + 500,
      sessions: Math.floor(Math.random() * 2000) + 1000,
      revenue: Math.floor(Math.random() * 5000) + 2000,
      growth: Math.floor(Math.random() * 30) + 5
    }))
  }

  const data = generateMonthlyData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '0.75rem',
          backdropFilter: 'blur(10px)',
          color: 'white'
        }}>
          <p style={{ fontWeight: 600, margin: '0 0 0.5rem 0' }}>{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ 
              margin: '0.25rem 0',
              fontSize: '0.875rem',
              color: entry.color
            }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ color: 'white', height: '100%' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0 1.5rem 0',
        textAlign: 'center'
      }}>
        6-Month Dashboard Overview
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>12.5K</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>Total Users</div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.125rem 0.5rem',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'inline-block'
          }}>+12%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>8.2K</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>Active Sessions</div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.125rem 0.5rem',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'inline-block'
          }}>+8%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>$24.1K</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>Revenue</div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.125rem 0.5rem',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'inline-block'
          }}>+15%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>18%</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>Growth Rate</div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.125rem 0.5rem',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            display: 'inline-block'
          }}>+3%</div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            margin: '0 0 1rem 0',
            textAlign: 'center'
          }}>User Engagement Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="month" 
                stroke="white" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="white" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Users"
              />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Sessions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            margin: '0 0 1rem 0',
            textAlign: 'center'
          }}>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="month" 
                stroke="white" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="white" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                name="Revenue ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
