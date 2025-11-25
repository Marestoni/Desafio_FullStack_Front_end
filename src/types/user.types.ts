
export interface UserDto {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  mail: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
  lastSyncedAt: string;
  eventCount: number;
}

export interface CalendarEvent {
  id: string;
  subject: string;
  bodyPreview: string;
  start: string;
  end: string;
  location: string;
  isAllDay: boolean;
  organizerEmail: string;
  organizerName: string;
  lastUpdatedAt: string;
}

export interface UserWithEvents {
  user: UserDto;
  events: CalendarEvent[];
}