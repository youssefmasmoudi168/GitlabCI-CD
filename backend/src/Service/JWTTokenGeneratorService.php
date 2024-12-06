<?php

namespace App\Service;

use JsonException;
use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class JWTTokenGeneratorService
{
    private $JWTManager;

    public function __construct(JWTTokenManagerInterface $JWTManager)
    {
        $this->JWTManager = $JWTManager;
    }

    public function generate(User $user): string
    {
        if (!$user) {
            throw new JsonException('Token generation failed for invalid user', 404);
        }
        $token = $this->JWTManager->create($user);
        return $token;
    }
}