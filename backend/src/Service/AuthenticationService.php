<?php

namespace App\Service;

use App\Service\JWTTokenGeneratorService;
use App\Repository\UserRepository;
use JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\SecurityBundle\Security;

class AuthenticationService
{
    private $JWTGenerator;
    private $userRepository;
    private $serializer;
    private $encoders;
    private $normalizers;
    private $userValidator;

    private $security;

    public function __construct(UserRepository $userRepository, JWTTokenGeneratorService $JWTGenerator, Security $security)
    {
        $this->JWTGenerator = $JWTGenerator;
        $this->userRepository = $userRepository;
        $this->encoders = [new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        $this->security = $security;
    }

    public function authenticate(array $loginUser): array
    {
        $user = $this->userRepository->findOneBy(array('email' => $loginUser['email']));

        if (!$user) {
            throw new JsonException('User "' . $loginUser['email'] . '" not found', 404, null);
        }

        $this->security->login($user);

        $token = $this->JWTGenerator->generate($user);

        return ['user' => $user, 'token' => $token];
    }

    public function registerUser($user): JsonResponse
    {
        $createdUserId = $this->userRepository->create($user, true);
        
        return new JsonResponse(['id' => $createdUserId], 200);
    }


}