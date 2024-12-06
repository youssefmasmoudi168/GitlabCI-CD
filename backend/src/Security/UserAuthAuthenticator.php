<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\JWTTokenGeneratorService;
use App\Repository\UserRepository ;


class UserAuthAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'api_auth_login';

    private UrlGeneratorInterface $urlGenerator;
    private JWTTokenGeneratorService $JWTGenerator;
    private UserRepository $userRepository ;

    public function __construct(UrlGeneratorInterface $urlGenerator, JWTTokenGeneratorService $JWTGenerator, UserRepository $userRepository)
    {
        $this->urlGenerator = $urlGenerator;
        $this->JWTGenerator = $JWTGenerator;
        $this->userRepository =$userRepository ;
    }

    public function authenticate(Request $request): Passport
    {
        $req = $request->toArray();

        $email = $req['email'];
        $user = $this->userRepository->findByEmail($email);
        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($req['password']),
            [
                new CsrfTokenBadge('authenticate',  $this->JWTGenerator->generate($user)),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
       /* if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new JsonResponse(['id' => $createdUserId], 200);
        }*/

        // For example:
        return new JsonResponse(['id' => "authenticated"], 200);
      //  throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}