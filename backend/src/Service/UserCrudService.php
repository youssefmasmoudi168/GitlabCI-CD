<?php

namespace App\Service;

use App\Repository\UserRepository;
use JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class UserCrudService
{

    private $userRepository;
    private $serializer;
    private $encoders;
    private $normalizers;
    private $userValidator;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->encoders = [new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }

    public function deleteAllUsers(): JsonResponse
    {
        $users = $this->userRepository->findAll();
        foreach ($users as $user) {
            $this->userRepository->remove($user, true);
        }
        $this->userRepository->resetAutoIncrement();
        return new JsonResponse(['message' => 'All users deleted'], 200);
    }

    public function deleteUserById(int $id): JsonResponse
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            throw new JsonException('User "' . $id . '" not found', 404, null);
        }
        $this->userRepository->remove($user, true);
        return new JsonResponse(['id' => $id], 200);
    }

    public function fetchUserById(int $id): JsonResponse
    {
        $user = $this->userRepository->find($id);
        $userJSON = $this->serializer->serialize($user, 'json', [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['password']
        ]);
        if (!$user) {
            throw new JsonException('User "' . $id . '" not found', 404, null);
        }
        return new JsonResponse($userJSON, 200, ['application/json'], true);
    }

    public function fetchUsers(): JsonResponse
    {
        $users = $this->userRepository->findAll();
        $usersJSON = $this->serializer->serialize($users, 'json', [
            ObjectNormalizer::IGNORED_ATTRIBUTES => ['password']
        ]);
        if (!$users) {
            throw new JsonException('No users found', 404, null);
        }
        return new JsonResponse($usersJSON, 200, ['application/json'], true);
    }

    public function updateUserById($id): JsonResponse
    {
        return new JsonResponse(['message' => 'User updated'], 200);
    }

    public function createUser($user): JsonResponse
    {
        $createdUserId = $this->userRepository->create($user, true);
        return new JsonResponse(['id' => $createdUserId], 200);
    }
}