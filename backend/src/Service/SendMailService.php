<?php 

namespace App\Service;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
class SendMailService 
{
    
    public function send() : void 
    {
        $transport = Transport::fromDsn('smtp://127.0.0.1');
        $mailer = new Mailer($transport);
        
        $email = (new Email())
            ->from('hello@example.com')
            ->to('you@example.com')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');
        
        $mailer->send($email);
    }
}