// Admin configuration for ticket management
export const ADMIN_CONFIG = {
  // Discord UIDs of users with admin access to ticket system
  OWNER_UIDS: [
    // Add your Discord UID here - you can get it by enabling Developer Mode in Discord
    // and right-clicking your profile to copy User ID
    process.env.OWNER_DISCORD_UID, // Primary owner
    // Add additional admin UIDs here as needed
    // "123456789012345678", // Additional admin
  ].filter(Boolean), // Remove any undefined values

  // Admin roles and permissions
  PERMISSIONS: {
    VIEW_ALL_TICKETS: true,
    UPDATE_TICKET_STATUS: true,
    DELETE_TICKETS: true,
    RESPOND_TO_TICKETS: true,
    VIEW_USER_INFO: true,
    ESCALATE_TICKETS: true,
  },

  // Ticket status options
  TICKET_STATUS: {
    OPEN: 'open',
    IN_PROGRESS: 'in-progress',
    WAITING_FOR_USER: 'waiting-for-user',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
  } as const,

  // Priority levels
  PRIORITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,
};

export type TicketStatus = typeof ADMIN_CONFIG.TICKET_STATUS[keyof typeof ADMIN_CONFIG.TICKET_STATUS];
export type PriorityLevel = typeof ADMIN_CONFIG.PRIORITY_LEVELS[keyof typeof ADMIN_CONFIG.PRIORITY_LEVELS];

// Helper function to check if a user is an admin
export function isAdmin(discordUserId: string | undefined): boolean {
  if (!discordUserId) return false;
  return ADMIN_CONFIG.OWNER_UIDS.includes(discordUserId);
}

// Helper function to get admin permissions
export function getAdminPermissions() {
  return ADMIN_CONFIG.PERMISSIONS;
}

// Helper function to get available ticket statuses
export function getTicketStatuses() {
  return Object.values(ADMIN_CONFIG.TICKET_STATUS);
}

// Helper function to get priority levels
export function getPriorityLevels() {
  return Object.values(ADMIN_CONFIG.PRIORITY_LEVELS);
}