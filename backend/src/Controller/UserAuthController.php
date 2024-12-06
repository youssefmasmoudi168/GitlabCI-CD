<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\SendMailService;
use App\Service\AuthenticationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;


class UserAuthController extends AbstractController
{
    #[Route('/api/login', name: 'api_login')]
    public function login(Request $request, UserRepository $userRepository, JWTTokenManagerInterface $JWTManager,#[CurrentUser] ?User $user): Response
    {
        $data = $request->toArray();

        // $user = $userRepository->findByEmail($data['email']);
        if (!$user) {
            return $this->json(['error' => 'Invalid User']);
        }
        $request->getSession()->set(Security::LAST_USERNAME, $data['email']);
        $token = $JWTManager->create($user);
        // $security->setUser($user);
        // $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        // get the login error if there is one

        // last username entered by the user

        return $this->json(['token' => $token, 'user' => $user]);
    }

    // public function login(AuthenticationService $authenticationService, Request $request): Response
    // {
    //     $user = $request->toArray();
    //     $request->getSession()->set(Security::LAST_USERNAME, $user['email']);
    //     // $this->container->get('security.user_checker')->checkPreAuth($user);
    //     return $this->json($authenticationService->authenticate($user));
    // }

    #[Route('/api/register', name: 'api_register')]
    public function register(Request $request, AuthenticationService $authService, SendMailService $sendMailService): JsonResponse
    {
        return $authService->registerUser($request->toArray());
        // $send = $sendMailService->send();
        //return $this->json(['message' => $request->toArray()['email'],]);
    }

    #[Route(path: '/api/logout', name: 'api_logout', methods: ['GET'])]
    public function logout(Security $security): Response
    {
        // dd($security->getUser());
        if (!$security->getUser()) {
            return $this->json(['error' => 'You are not logged in']);
        }

        $security->logout(false);

        return $this->json(['message' => "You have been logged out"]);
    }
}