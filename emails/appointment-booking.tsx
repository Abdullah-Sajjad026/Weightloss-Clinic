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

interface AppointmentBookingEmailProps {
  appointment: {
    id: string
    name: string
    email: string
    phone: string
    consultationType: string
    preferredDate: Date
    notes?: string | null
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

export function AppointmentBookingEmail({ appointment }: AppointmentBookingEmailProps) {
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

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px' }}>
            <Heading style={{ color: '#7c3aed', textAlign: 'center', marginBottom: '24px' }}>
              Northampton Clinic
            </Heading>
            
            <Heading style={{ color: '#111827', fontSize: '24px', marginBottom: '16px' }}>
              Appointment Request Received
            </Heading>
            
            <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px' }}>
              Dear {appointment.name},
            </Text>
            
            <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px' }}>
              Thank you for your appointment request. We have received your booking request and our team will contact you within 24 hours to confirm your consultation.
            </Text>

            <Section style={{ 
              backgroundColor: '#f3f4f6', 
              borderRadius: '8px', 
              padding: '20px', 
              margin: '24px 0' 
            }}>
              <Heading style={{ color: '#111827', fontSize: '18px', marginBottom: '16px' }}>
                Your Appointment Details
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
                  </Text>
                </Column>
              </Row>

              <Row style={{ marginBottom: '12px' }}>
                <Column>
                  <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                    Duration:
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: '0', color: '#374151' }}>
                    {appointment.timeSlot.duration} minutes
                  </Text>
                </Column>
              </Row>

              {appointment.notes && (
                <Row>
                  <Column>
                    <Text style={{ margin: '0', fontWeight: 'bold', color: '#374151' }}>
                      Notes:
                    </Text>
                  </Column>
                  <Column>
                    <Text style={{ margin: '0', color: '#374151' }}>
                      {appointment.notes}
                    </Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Section style={{ 
              backgroundColor: '#dbeafe', 
              borderLeft: '4px solid #3b82f6',
              borderRadius: '4px', 
              padding: '16px', 
              margin: '24px 0' 
            }}>
              <Heading style={{ color: '#1e40af', fontSize: '16px', margin: '0 0 8px 0' }}>
                What's Next?
              </Heading>
              <Text style={{ color: '#1e40af', margin: '4px 0' }}>
                • Our team will call you to confirm your preferred date and time
              </Text>
              <Text style={{ color: '#1e40af', margin: '4px 0' }}>
                • You'll receive an email with video call instructions
              </Text>
              <Text style={{ color: '#1e40af', margin: '4px 0' }}>
                • Please have your medical history and questions ready
              </Text>
            </Section>

            <Hr style={{ margin: '24px 0', borderColor: '#e5e7eb' }} />
            
            <Text style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>
              If you have any questions or need to make changes, please contact us at:
              <br />
              Phone: 01604 123456 | Email: info@northamptonclinic.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}