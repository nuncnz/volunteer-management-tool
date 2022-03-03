/**
 * This class will act as a dependency injector / service manager for easy access to all services.
 */
import {EmailService} from "../models/emailjs/EmailService";

export class DI {

    static EmailService = new EmailService()

}