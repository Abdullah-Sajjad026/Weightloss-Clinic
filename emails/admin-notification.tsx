import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components'

interface AdminNotificationEmailProps {
  appointment: {
    id: string
    name: string
    email: string
    phone: string
    consultationType: string
    preferredDate: Date
    timezone?: string | null
    notes?: string | null
    meetingLink?: string | null
    meetingId?: string | null
    timeSlot: {
      dayOfWeek: number
      startTime: string
      endTime: string
      duration: number
    }
  }
}

const DAYS_OF_WEEK = {
  1: 'Monday',
  2: 'Tuesday', 
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

const CONSULTATION_TYPES = {
  INJECTIONS: 'Weight Loss Injections',
  PILLS: 'Weight Loss Pills',
  SURGERY: 'Bariatric Surgery',
  GENERAL: 'General Consultation',
}

export function AdminNotificationEmail({ appointment }: AdminNotificationEmailProps) {
  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px' }}>
            <Heading style={{ color: '#dc2626', textAlign: 'center', marginBottom: '24px' }}>
              🚨 New Appointment Request
            </Heading>
            
            <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px' }}>
              A new appointment request has been submitted and requires your attention.
            </Text>

            <Section style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca',
              borderRadius: '8px', 
              padding: '20px', 
              margin: '24px 0' 
            }}>
              <Heading style={{ color: '#dc2626', fontSize: '18px', marginBottom: '16px' }}>
                Patient Information
              </Heading>
              
              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Name:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {appointment.name}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Email:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {appointment.email}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Phone:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {appointment.phone}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section style={{ 
              backgroundColor: '#f3f4f6', 
              borderRadius: '8px', 
              padding: '20px', 
              margin: '24px 0' 
            }}>
              <Heading style={{ color: '#111827', fontSize: '18px', marginBottom: '16px' }}>
                Appointment Details
              </Heading>
              
              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Consultation Type:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {CONSULTATION_TYPES[appointment.consultationType as keyof typeof CONSULTATION_TYPES]}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Preferred Date:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {formatDate(appointment.preferredDate)}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Time Slot:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {DAYS_OF_WEEK[appointment.timeSlot.dayOfWeek as keyof typeof DAYS_OF_WEEK]}s {' '}
                    {formatTime(appointment.timeSlot.startTime)} - {formatTime(appointment.timeSlot.endTime)}
                    {' '}({appointment.timeSlot.duration} min)
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Request Time:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {formatDateTime(new Date())}
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Appointment ID:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151', fontFamily: 'monospace' }}>
                    {appointment.id}
                  </Text>
                </Column>
              </Row>

              {appointment.notes && (
                <>
                  <Hr style={{ margin: '16px 0', borderColor: '#d1d5db' }} />
                  <Row>
                    <Column>
                      <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                        Patient Notes:
                      </Text>
                      <Text style={{ 
                        margin: '8px 0 0 0', 
                        color: '#374151',
                        backgroundColor: '#ffffff',
                        padding: '12px',
                        borderRadius: '4px',
                        fontStyle: 'italic'
                      }}>
                        "{appointment.notes}"
                      </Text>
                    </Column>
                  </Row>
                </>
              )}
              
              {/* Meeting Details for Admin */}
              {appointment.meetingLink && (
                <>
                  <Hr style={{ margin: '16px 0', borderColor: '#d1d5db' }} />
                  <Row>
                    <Column>
                      <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                        Google Meet Link:
                      </Text>
                      <Text style={{ 
                        margin: '8px 0 0 0', 
                        color: '#3b82f6',
                        textDecoration: 'underline'
                      }}>
                        {appointment.meetingLink}
                      </Text>
                    </Column>
                  </Row>
                </>
              )}
              
              {appointment.timezone && (
                <>
                  <Hr style={{ margin: '16px 0', borderColor: '#d1d5db' }} />
                  <Row>
                    <Column>
                      <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                        Patient Timezone:
                      </Text>
                      <Text style={{ margin: '8px 0 0 0', color: '#374151' }}>
                        {appointment.timezone}
                      </Text>
                    </Column>
                  </Row>
                </>
              )}
            </Section>

            <Section style={{ 
              backgroundColor: '#fef3c7', 
              border: '1px solid #fbbf24',
              borderRadius: '8px', 
              padding: '20px', 
              margin: '24px 0' 
            }}>
              <Heading style={{ color: '#92400e', fontSize: '16px', margin: '0 0 12px 0' }}>
                Action Required
              </Heading>
              <Text style={{ color: '#92400e', margin: '4px 0' }}>
                1. Contact the patient within 24 hours to confirm appointment
              </Text>
              <Text style={{ color: '#92400e', margin: '4px 0' }}>
                2. Update appointment status in admin dashboard
              </Text>
              <Text style={{ color: '#92400e', margin: '4px 0' }}>
                3. Send video call details once confirmed
              </Text>
            </Section>

            <Hr style={{ margin: '24px 0', borderColor: '#e5e7eb' }} />
            
            <Text style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>
              Login to admin dashboard to manage this appointment:
              <br />
              <strong>Admin Dashboard:</strong> /admin/appointments
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}