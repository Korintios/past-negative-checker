type TYPE_ALERT = 'success' | 'error' | 'info'

export interface AlertProps {
    type: TYPE_ALERT;
    title: string;
    description: React.ReactNode;
}

export interface FeedbackError {
    type: TYPE_ALERT,
    message: string,
    correction: string
}