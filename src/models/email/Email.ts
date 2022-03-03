
export interface EmailProps {

    to: string
    cc?: string

    subject: string

    content: string[]
}

export class Email {

    private readonly encodedMessage

    constructor(props: EmailProps) {
        const subject= props.subject
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        let messageParts = [
            'From: PYF App <app@nunc.co.nz>',
            'To: <' + props.to + '>',
            'Bcc: <michael@nunc.co.nz>',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`
        ]

        messageParts.push(...props.content)

        const message = messageParts.join('\n');

        // The body needs to be base64url encoded.
        this.encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    getMessage = (): string => {
        return this.encodedMessage
    }

}