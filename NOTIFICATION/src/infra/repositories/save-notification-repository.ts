import NotificationEntity from "../entities/notification-entity";

export interface NotificationDTO {
    emailSubject: string;
    emailBody: string;
    emailTo: string;
    sentAt?: Date | null;
}

export const saveNotificationRepository = async (data: NotificationDTO) => {
    return NotificationEntity.create({
        emailSubject: data.emailSubject,
        emailBody: data.emailBody,
        emailTo: data.emailTo,
        sentAt: data.sentAt ?? null,
    });
};