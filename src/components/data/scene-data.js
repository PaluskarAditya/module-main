import Inbox from '../Inbox';
import Website1 from '../Website1';
import Login1 from '../Login1';
import SE1 from '../SE1';
import Pwd from '../Pwd';
import USB1 from '../USB1';
import Wallet1 from '../Wallet1';
import Website2 from '../Website2';

const scenes = [
  {
    id: 1,
    name: "Phishing Email Investigation",
    type: "phishing",
    difficulty: "easy",
    difficultyStars: "⭐",
    description: "Analyze suspicious emails and identify phishing attempts targeting employees",
    component: Inbox,
    instructions: "Review the email carefully and identify any signs of phishing.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ['Phishing Mail', 'Social Engineering Mail', 'Malware Mail'],
          answer: 'Phishing Mail',
          resp: false,
          clicked: false
        },
        subject: {
          name: 'subject',
          value: 'URGENT: Your Account Will Be Terminated',
          options: ['Urgent notice', 'Phishing attempt', 'System alert'],
          answer: 'Phishing attempt',
          clicked: false
        },
        from: {
          name: 'from',
          value: 'security-team@gooogle.com',
          options: ['Suspicious domain', 'Legitimate Google domain', 'Impersonation attempt'],
          answer: 'Suspicious domain',
          clicked: false
        },
        body: {
          name: 'body',
          value: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #d32f2f; margin-bottom: 16px;">URGENT SECURITY ALERT</h2>
              <p>Dear Valued Customer,</p>
              <p>Our system has detected unusual login attempts on your account from an unrecognized device in <strong>Berlin, Germany</strong>.</p>
              <p>To prevent immediate termination of your account, please verify your identity by clicking the link below and providing:</p>
              <ul style="margin: 12px 0; padding-left: 24px;">
                <li>Your login credentials</li>
                <li>Current phone number</li>
                <li>Last 4 digits of your Social Security Number</li>
              </ul>
              <div style="background-color: #f5f5f5; padding: 12px; margin: 16px 0; border-radius: 4px;">
                <a href="http://www.secure-google.tk/verify" 
                   style="color: #1976d2; text-decoration: none; font-weight: bold;">
                  ➤ Click here to verify your account now
                </a>
              </div>
              <p style="color: #d32f2f; font-weight: bold; margin-top: 16px;">
                ⚠️ Warning: Account termination in 24 hours if no action taken!
              </p>
              <p style="margin-top: 24px;">
                Best regards,<br/>
                <strong>Google Security Team</strong>
              </p>
              <p style="font-size: 11px; color: #757575; margin-top: 24px;">
                This is an automated message. Please do not reply directly to this email.
              </p>
            </div>
          `,
          options: ['Legitimate request', 'Phishing attempt', 'Account notification'],
          answer: 'Phishing attempt',
          clicked: false
        },
      },
      // ... other emails
    ]
  },
  {
    id: 2,
    name: "Suspicious Download Alert",
    type: "malware",
    difficulty: "hard",
    difficultyStars: "⭐⭐⭐",
    description: "Investigate a potential malware infection from a suspicious file download",
    component: Website1,
    instructions: "Examine the download source and the file details before proceeding.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ['Legitimate Software', 'Malware', 'Adware'],
          answer: 'Malware',
          resp: false,
          clicked: false
        },
        content: {
          title: {
            name: 'Title',
            value: 'Windows Security Update Center',
            options: ['Legitimate title', 'Suspicious title', 'Misleading title'],
            answer: 'Suspicious title',
            clicked: false
          },
          header: {
            name: 'Header',
            value: 'CRITICAL SYSTEM UPDATE REQUIRED',
            options: ['Normal header', 'Urgent warning', 'Scare tactic'],
            answer: 'Scare tactic',
            clicked: false
          },
          message: {
            name: 'Message',
            value: 'Our security scan has detected that your Windows system is missing critical security updates. Your system is at high risk of malware infection.',
            options: ['Informative message', 'Fear-based manipulation', 'Technical details'],
            answer: 'Fear-based manipulation',
            clicked: false
          },
          downloadButton: {
            name: 'Download Button',
            value: 'Download Security Update (SecurityPatch_2023.exe)',
            options: ['Safe download', 'Malicious file', 'System update'],
            answer: 'Malicious file',
            clicked: false
          },
          progressBar: {
            name: 'Progress Bar',
            value: '85%',
            options: ['Real scan', 'Fake progress', 'Loading animation'],
            answer: 'Fake progress',
            clicked: false
          },
          securityStatus: {
            name: 'Security Status',
            value: 'System vulnerability level: High',
            options: ['Status indicator', 'Scare tactic', 'System metric'],
            answer: 'Scare tactic',
            clicked: false
          },
          fileInfo: {
            name: 'File Info',
            value: 'File size: 2.3 MB',
            options: ['File metadata', 'Deceptive detail', 'Technical info'],
            answer: 'Deceptive detail',
            clicked: false
          },
          url: {
            name: 'URL',
            value: 'http://windowz-support.com/update',
            options: ['Legitimate domain', 'Suspicious domain', 'Known malware domain'],
            answer: 'Suspicious domain',
            clicked: false
          }
        }
      }
    ]
  },
  {
    id: 3,
    name: "Fake Login Portal",
    type: "credential-theft",
    difficulty: "hard",
    difficultyStars: "⭐⭐⭐",
    description: "Detect and analyze a sophisticated credential harvesting campaign",
    component: Login1,
    instructions: "Identify the signs of a fake login portal and report them.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ['Credential Theft', 'Legitimate Login', 'Fake Portal'],
          answer: 'Credential Theft',
          resp: false,
          clicked: false
        },
        url: {
          name: 'URL',
          value: 'https://instegram.com/login',
          options: ['Legitimate domain', 'Typosquatting domain', 'Instagram domain'],
          answer: 'Typosquatting domain',
          clicked: false
        },
        logo: {
          name: 'Logo',
          value: 'Instagram Logo',
          options: ['Official branding', 'Copied asset', 'Modified logo'],
          answer: 'Copied asset',
          clicked: false
        },
        loginForm: {
          name: 'Login Form',
          value: 'Instagram login form with username and password fields',
          options: ['Authentic form', 'Data harvesting form', 'Standard login'],
          answer: 'Data harvesting form',
          clicked: false
        },
        facebookButton: {
          name: 'Facebook Login Button',
          value: 'Log in with Facebook',
          options: ['Real integration', 'Credential harvester', 'Social login'],
          answer: 'Credential harvester',
          clicked: false
        },
        securityIndicators: {
          name: 'Security Indicators',
          value: 'Missing HTTPS padlock',
          options: ['Valid certificate', 'Invalid SSL', 'No security'],
          answer: 'Invalid SSL',
          clicked: false
        },
        visualDesign: {
          name: 'Visual Design',
          value: 'Instagram-like interface',
          options: ['Original design', 'Cloned layout', 'Modified theme'],
          answer: 'Cloned layout',
          clicked: false
        },
        forgotPassword: {
          name: 'Forgot Password',
          value: 'Forgot password?',
          options: ['Real link', 'Phishing link', 'Standard link'],
          answer: 'Phishing link',
          clicked: false
        }
      }
    ]
  },
  {
    id: 4,
    name: "WhatsApp Bank Scam",
    type: "social-engineering",
    difficulty: "medium",
    difficultyStars: "⭐⭐",
    description: "Identify red flags in a suspicious WhatsApp message claiming to be from your bank",
    component: SE1,
    instructions: "Analyze the message for urgency and suspicious links.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ["Legitimate Message", "Scam Attempt", "Bank Communication"],
          answer: "Scam Attempt",
          resp: false,
          clicked: false
        },
        phoneNumber: {
          name: "Phone Number",
          value: "+1 (234) 567-8900",
          options: ["Legitimate bank number", "Spoofed number", "Unknown caller"],
          answer: "Spoofed number",
          clicked: false
        },
        initialMessage: {
          name: "Initial Message",
          value: "Hello, I'm from Exim Bank.",
          options: ["Official greeting", "Vague introduction", "Standard message"],
          answer: "Vague introduction",
          clicked: false
        },
        urgencyTactic: {
          name: "Urgency Creation",
          value: "We've noticed some unusual activity on your account.",
          options: ["Real security alert", "Pressure tactic", "Normal notification"],
          answer: "Pressure tactic",
          clicked: false
        },
        fraudulentLink: {
          name: "Verification Link",
          value: "https://secure-bank-verify.com/card-update",
          options: ["Official bank domain", "Phishing URL", "Legitimate portal"],
          answer: "Phishing URL",
          clicked: false
        },
        messageTime: {
          name: "Message Timing",
          value: "12:45 PM" // Static
        },
        communicationChannel: {
          name: "Communication Method",
          value: "WhatsApp message" // Static
        },
        otherChats: [
          {
            name: "Mom",
            lastMessage: "Don't forget to pick up milk on your way home!",
            time: "11:30 AM",
            unread: 0
          },
          {
            name: "Work Group",
            lastMessage: "Meeting rescheduled to 3 PM",
            time: "10:15 AM",
            unread: 3
          },
          {
            name: "John",
            lastMessage: "Are we still on for lunch tomorrow?",
            time: "Yesterday",
            unread: 0
          },
          {
            name: "Gym Buddies",
            lastMessage: "Alice: See you all at 6 AM!",
            time: "Yesterday",
            unread: 5
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Suspicious IT Support Email",
    type: "phishing",
    difficulty: "hard",
    difficultyStars: "⭐⭐⭐",
    description: "Analyze an email from IT support requesting urgent system access",
    component: Inbox,
    instructions: "Verify the sender's email address and the urgency of the request.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ['Legitimate IT Request', 'Phishing Attempt', 'System Update Notice'],
          answer: 'Phishing Attempt',
          resp: false,
          clicked: false
        },
        subject: {
          name: 'email subject',
          value: 'Critical: Immediate System Access Required - IT Department', // Remove options to make it non-clickable
          clicked: false
        },
        from: {
          name: 'sender address',
          value: 'it-support@company-systems.net',
          options: ['Internal IT Email', 'External Domain', 'Spoofed Address'],
          answer: 'Spoofed Address',
          clicked: false
        },
        body: {
          name: 'mail body',
          value: `
            <div style="font-family: Arial, sans-serif;">
              <p>Dear Emma,</p>
              <p>Our security monitoring system has detected unusual activity on your workstation that requires immediate attention. To prevent any potential data loss or system compromise, we need to perform an emergency security audit.</p>
              <p>Please follow these steps immediately:</p>
              <ol>
                <li>Download and run the attached anti-virus software</li>
                <li>Enter your network credentials when prompted</li>
                <li>Allow full system access when requested</li>
              </ol>
              <p style="color: red;">WARNING: Failure to comply within 30 minutes may result in automatic system lockdown as per security protocol Section 5.2</p>
              <p>If you have any questions, do not reply to this email. Instead, call our emergency support line at +1 (555) 123-4567.</p>
              <p>Best regards,<br/>
              James Wilson<br/>
              Senior IT Security Specialist<br/>
              Corporate IT Department</p>
              <div style="color: gray; font-size: 10px; border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px;">
                Confidential: This email contains sensitive information and is intended only for the addressed recipient.
              </div>
            </div>
          `,
          options: ['Standard IT Protocol', 'Suspicious Request', 'Normal Maintenance'],
          answer: 'Suspicious Request',
          clicked: false
        },
        urgency: {
          name: 'Urgency Level',
          value: '30 minute deadline',
          options: ['Standard Timeline', 'Artificial Urgency', 'Normal Priority'],
          answer: 'Artificial Urgency',
          clicked: false
        },
        attachment: {
          name: 'Executable File',
          value: 'anti-virus.exe',
          options: ['Legitimate Software', 'Malicious File', 'Company Anti-virus'],
          answer: 'Malicious File',
          clicked: false
        },
        contact: {
          name: 'Contact Method',
          value: '+1 (555) 123-4567',
          options: ['Valid IT Support', 'Unknown Number', 'Suspicious Contact'],
          answer: 'Suspicious Contact',
          clicked: false
        },
        otherEmails: [
          {
            subject: "Team Meeting Notes - Q3 Planning",
            from: "sarah.johnson@company.com",
            preview: "Hi team, Attached are the meeting notes from yesterday's quarterly planning session. Please review the action items assigned to you...",
            time: "10:30 AM",
            unread: false
          },
          {
            subject: "Office Holiday Party - Save the Date!",
            from: "events@company.com",
            preview: "Join us for our annual holiday celebration on December 15th at the Grand Hotel. RSVP required by December 1st...",
            time: "Yesterday",
            unread: true
          },
          {
            subject: "Updated Employee Benefits Guide 2024",
            from: "hr@company.com",
            preview: "Please find attached the updated employee benefits guide for 2024. Open enrollment period begins next week...",
            time: "2 days ago",
            unread: false
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Password Security Challenge",
    type: "password-security",
    difficulty: "easy",
    difficultyStars: "⭐",
    description: "Test your knowledge of password best practices and common attack methods",
    component: Pwd,
    scene: [
      {
        requirements: {
          minLength: 12,
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true
        },
        feedback: {
          tooShort: "Password must be at least 12 characters long",
          noUppercase: "Include at least one uppercase letter",
          noLowercase: "Include at least one lowercase letter",
          noNumbers: "Include at least one number",
          noSymbols: "Include at least one special character",
          weak: "This password is too weak",
          medium: "This password has medium strength",
          strong: "This is a strong password!"
        },
        commonPasswords: [
          "password123",
          "qwerty123",
          "letmein123",
          "admin123",
          "welcome123"
        ],
        passwordTips: [
          "Use a mix of letters, numbers and symbols",
          "Make it at least 12 characters long",
          "Don't use personal information",
          "Avoid common substitutions",
          "Use a unique password for each account"
        ],
        strengthLevels: {
          0: "Very Weak",
          1: "Weak",
          2: "Medium",
          3: "Strong",
          4: "Very Strong"
        },
        strengthColors: {
          0: "red",
          1: "orange",
          2: "yellow",
          3: "light-green",
          4: "green"
        }
      }
    ]
  },
  {
    id: 7,
    name: "USB Drop Attack",
    type: "usb-drop",
    difficulty: "medium",
    difficultyStars: "⭐⭐",
    description: "Analyze a suspicious USB device found in the workplace",
    component: USB1,
    instructions: "Use terminal commands to safely analyze the USB device",
    scene: [
      {
        title: {
          value: "Unlabeled USB Drive (32GB)"
        },
        mount: {
          name: "Mount Decision",
          value: "Should you mount this USB?",
          options: [
            "Mount to inspect",
            "Eject and report",
            "Ask colleague"
          ],
          answer: "Eject and report"
        },
        contents: {
          name: "USB Contents",
          value: "Files found on USB",
          options: [
            "Normal documents",
            "Suspicious executables",
            "Personal files"
          ],
          answer: "Suspicious executables"
        },
        scan: {
          name: "Scan Results",
          value: "install.sh analysis",
          options: [
            "Legitimate script",
            "Ransomware payload",
            "System utility"
          ],
          answer: "Ransomware payload"
        },
        action: {
          name: "Mitigation Action",
          value: "How to handle malicious file?",
          options: [
            "Delete immediately",
            "Quarantine for analysis",
            "Ignore it"
          ],
          answer: "Delete immediately"
        },
        sus: {
          name: "Final Assessment",
          value: "What was this device?",
          options: [
            "Legitimate device",
            "Malicious USB drop",
            "Accidental loss"
          ],
          answer: "Malicious USB drop"
        }
      }
    ]
  },
  {
    id: 8,
    name: "Fake Software Update",
    type: "malware",
    difficulty: "medium",
    difficultyStars: "⭐⭐",
    description: "Identify and block malicious software masquerading as legitimate updates",
    component: Website2,
    instructions: "Check the authenticity of the software update before proceeding.",
    scene: [
      {
        phishing: true,
        sus: {
          options: ['Legitimate Update', 'Malware Update', 'System Update'],
          answer: 'Malware Update',
          resp: false,
          clicked: false
        },
        content: {
          popupTitle: {
            name: 'Popup Title',
            value: 'Adobe Flash Player Update Required',
            options: ['Legitimate Adobe Update', 'Fake Update Notice', 'System Notification'],
            answer: 'Fake Update Notice',
            clicked: false
          },
          downloadSource: {
            name: 'Download Source',
            value: 'http://adobe-flash-update.net/download',
            options: ['Official Adobe Domain', 'Impersonation Domain', 'Trusted Source'],
            answer: 'Impersonation Domain',
            clicked: false
          },
          updateButton: {
            name: 'Update Button',
            value: 'Update Now (Required)',
            options: ['Safe Action', 'Malicious Prompt', 'Normal Update'],
            answer: 'Malicious Prompt',
            clicked: false
          }
        }
      }
    ]
  },
  {
    "id": 9,
    "name": "Executive Wire Transfer Fraud",
    "type": "business-email-compromise",
    "difficulty": "hard",
    "difficultyStars": "⭐⭐⭐",
    "description": "Identify a sophisticated wire transfer fraud attempt impersonating an executive.",
    "component": Inbox,
    "instructions": "Verify the legitimacy of the request and the sender's email.",
    "scene": [
      {
        "phishing": true,
        "sus": {
          "options": ["BEC Fraud", "Phishing Scam", "Spam Email"],
          "answer": "BEC Fraud",
          "resp": false,
          "clicked": false
        },
        "subject": "CONFIDENTIAL: Urgent Wire Transfer Request",
        "from": {
          "name": "CEO - John Anderson",
          "value": "john.anderson@company-secure.com",
          "options": ["Spoofed domain", "Legitimate company domain", "Trusted sender"],
          "answer": "Spoofed domain",
          "clicked": false
        },
        "body": {
          "name": "mail body",
          "value": `
            <div style=\"font-family: 'Inter', sans-serif;\">
              <h2 style=\"color: red;\">URGENT: Wire Transfer Required</h2>
              <p>Dear Finance Team,</p>
              <p>I am currently out of the office and need an immediate wire transfer of <strong>$250,000</strong> to a new vendor.</p>
              <p>Please process this payment to the following account details:</p>
              <ul>
                <li><strong>Account Name:</strong> Global Business Solutions LLC</li>
                <li><strong>Bank:</strong> International Bank of Commerce</li>
                <li><strong>Account Number:</strong> 874563219</li>
                <li><strong>SWIFT Code:</strong> IBCUS33</li>
              </ul>
              <p>The payment is time-sensitive, and I need confirmation within the next hour.</p>
              <p>Best regards,<br/>John Anderson</p>
            </div>
          `,
          "options": ["Legitimate request", "Business Email Compromise", "Supplier invoice"],
          "answer": "Business Email Compromise",
          "clicked": false
        }
      },
      {
        "phishing": false,
        "sus": {
          "options": ["Routine vendor payment", "Contractor invoice", "Wire fraud attempt"],
          "answer": "Routine vendor payment",
          "resp": false,
          "clicked": false
        },
        "subject": "Invoice Payment Confirmation",
        "from": {
          "value": "billing@trustedvendor.com",
          "options": ["Verified vendor", "Unknown entity", "Phishing sender"],
          "answer": "Verified vendor",
          "clicked": false
        },
        "body": {
          "value": "Dear Accounts Team,\n\nWe have received your payment of $15,000 for invoice #INV-23987. Thank you for your prompt transaction.\n\nBest regards,\nTrusted Vendor Billing Team",
          "options": ["Payment confirmation", "Fake transaction", "Suspicious activity"],
          "answer": "Payment confirmation",
          "clicked": false
        }
      },
      {
        "phishing": false,
        "sus": {
          "options": ["Legitimate email", "Internal communication", "Potential fraud"],
          "answer": "Internal communication",
          "resp": false,
          "clicked": false
        },
        "subject": "Quarterly Budget Review Meeting",
        "from": {
          "value": "cfo@company.com",
          "options": ["Internal executive", "External contact", "Unknown source"],
          "answer": "Internal executive",
          "clicked": false
        },
        "body": {
          "value": "Dear Finance Team,\n\nPlease be reminded that our quarterly budget review is scheduled for Monday at 3 PM in the main conference room. Please come prepared with your department's financial updates.\n\nBest,\nCFO Office",
          "options": ["Legitimate request", "Impersonation attempt", "Spam message"],
          "answer": "Legitimate request",
          "clicked": false
        }
      }
    ]
  },
  {
    id: 10,
    name: "Crypto Wallet Scam",
    type: "cryptocurrency-scam",
    difficulty: "hard",
    difficultyStars: "⭐⭐⭐",
    description: "Identify a crypto scam starting from a phishing email",
    component: Wallet1,
    sus: {
      options: ['Crypto Wallet Scam', 'Phishing Email', 'Legitimate Notification'],
      answer: 'Crypto Wallet Scam',
      resp: false,
      clicked: false
    },
    instructions: "BIdentify a crypto scam starting from a phishing email",
    scene: [
      {
        scam: true,
        subject: 'URGENT: Wallet Security Verification Required',
        from: {
          value: 'security@cryptowallet-support.com',
          options: ['Legitimate Email', 'Suspicious Email', 'Phishing Email'],
          answer: 'Phishing Email',
          clicked: false
        },
        body: {
          value: `
            <div style="font-family: Arial, sans-serif;">
              <p>Dear User,</p>
              <p>We have detected suspicious activity on your account that requires immediate attention. To ensure the security of your funds, please verify your identity by clicking the link below:</p>
              <p><a href="https://secure-wallet-verify.com/verify" style="color: blue; text-decoration: underline;">Verify Your Identity</a></p>
              <p>If you do not verify your identity within 24 hours, your account will be temporarily suspended for security reasons.</p>
              <p>Thank you for your prompt attention to this matter.</p>
              <p>Best regards,<br/>Crypto Wallet Support Team</p>
            </div>
          `,
          options: ['Normal Security Notice', 'Suspicious Request', 'Phishing Attempt'],
          answer: 'Phishing Attempt',
          clicked: false
        },
        link: {
          value: 'https://secure-wallet-verify.com/verify',
          options: ['Official Domain', 'Suspicious Domain', 'Phishing Domain'],
          answer: 'Phishing Domain',
          clicked: false
        }
      },
      {
        scam: false,
        subject: 'Team Outing - RSVP Required',
        from: {
          value: 'hr@company.com',
        },
        body: {
          value: `
            <div style="font-family: Arial, sans-serif;">
              <p>Hi Team,</p>
              <p>We are excited to announce our annual team outing scheduled for next month. Please RSVP by clicking the link below:</p>
              <p><a href="https://company.com/rsvp" style="color: blue; text-decoration: underline;">RSVP Here</a></p>
              <p>Looking forward to your participation!</p>
              <p>Best regards,<br/>HR Team</p>
            </div>
          `,
        },
      },
      {
        scam: false,
        subject: 'Monthly Performance Report',
        from: {
          value: 'manager@company.com',
        },
        body: {
          value: `
            <div style="font-family: Arial, sans-serif;">
              <p>Dear Team,</p>
              <p>Please find attached the performance report for the month. Review the document and let me know if you have any questions.</p>
              <p>Best regards,<br/>Your Manager</p>
            </div>
          `,
        },
        attachments: [
          {
            name: 'Performance_Report_July.pdf',
            url: 'https://company.com/reports/Performance_Report_July.pdf'
          }
        ]
      },
    ]
  }
];

export default scenes;  