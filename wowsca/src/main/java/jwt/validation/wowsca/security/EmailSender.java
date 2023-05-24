package jwt.validation.wowsca.security;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public final class EmailSender {
    private static final EmailSender INSTANCE = new EmailSender();

    private EmailSender(){}

    public static EmailSender getInstance(){
        return INSTANCE;
    }

    private Map<Integer, String> codigos = new HashMap<>();
    private String username = "vitor.fraporti@acad.ufsm.br";
    private String senha = System.getenv("EMAIL");

    public boolean verificarCodigo(int codigo, String email){
        System.out.println(codigos);
        if(codigos.containsKey(codigo)){
            if(codigos.get(codigo).equals(email)){
                return true;
            }
        }
        return false;
    }

    public void esqueceuSenha(String email) throws MessagingException{
        System.out.println(codigos);
        System.out.println(email);
        Properties properties = new Properties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, senha);
            }
        });
        
        MimeMessage message = new MimeMessage(session);    
        message.addRecipient(Message.RecipientType.TO,new InternetAddress(email));    
        message.setSubject("Esqueci minha senha! - App Financeiro");
        int codigo = (int) (Math.random() * 1000000);
        message.setText("Codigo para recuperação de senha: " + codigo);

        codigos.put(codigo, email);
        
        Transport.send(message);
        System.out.println(codigos);
        lifeSpan(codigo);
   }

    private void lifeSpan(int codigo){
        new Thread(() -> {
            try {
                Thread.sleep(120000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            codigos.remove(codigo);
        }).start();
    }
}
