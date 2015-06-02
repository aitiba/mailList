silixManager, mail list manager


SilixManager is a mail list manager coded on sailsjs. We use those npm packages:

   * Passport for local authentication. http://iliketomatoes.com/implement-passport-js-authentication-with-sails-js-0-10-2/
   * mail-listener2 to listen to IMAP
   * emailjs for sending emails


=== Configuration ===

Add this to app/local.js:

	mailListener: {
        username: 'email@domain.com',
        password: "password",
        host: "host",
        port: 993,
        mailbox: "INBOX", // mailbox to monitor
    }
