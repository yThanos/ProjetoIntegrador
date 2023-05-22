package jwt.validation.wowsca.security;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {
    String senha = System.getenv("EMAIL");
    public void esqueceuSenha(String email) throws MessagingException{
        System.out.println(email);
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("vitor.rosmann@avmb.com.br", senha);
            }
        });
        
        MimeMessage message = new MimeMessage(session);    
        message.addRecipient(Message.RecipientType.TO,new InternetAddress(email));    
        message.setSubject("Esqueci minha senha! - App Financeiro");    
        message.setText("Codigo para recuperação de senha: 123456");    

        Transport.send(message);
    }
}
