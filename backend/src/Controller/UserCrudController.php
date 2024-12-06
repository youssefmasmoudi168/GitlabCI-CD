<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\UserCrudService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;


#[Route('/api/admin')]
class UserCrudController extends AbstractController
{
    #[Route('/user/delete/{id}', name: 'api_user_delete_by_id', methods: ['POST'])]
    public function deleteById(UserRepository $userRepository, $id , Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $user = $userRepository->findOneBy(["id" => $id]);
        $user->setIsActive(false);
        $userRepository->save($user, true);
        // dd($user);
        return $this->json($user);
    }

    #[Route('/user/delete', name: 'api_user_delete_all', methods: ['DELETE'])]
    public function deleteAll(UserCrudService $userCrudService, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        return $userCrudService->deleteAllUsers();
    }

    #[Route('/user/fetch/{id}', name: 'api_user_fetch_by_id', methods: ['GET'])]
    public function fetchById(UserRepository $userRepository, int $id, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        return $this->json($userRepository->findOneBy(["id" =>$id]));
    }

    #[Route('/user/fetch', name: 'api_user_fetch_all', methods: ['GET'])]
    public function fetchAll(UserRepository $userRepository, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        return $this->json($userRepository->findAll());
    }

    #[Route('/user/update/{id}', name: 'api_user_update_by_id', methods: ['PUT'])]
    public function update(UserRepository $userRepository,  $id, Request $request, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $data = $request->toArray();
        $user = $userRepository->findOneBy(['id' => $id]);
        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setRoles($data['roles']);
        $user->setIsVerified(true);
        $userRepository->save($user, true);
        return $this->json($user);
    }

    #[Route('/user/create', name: 'api_user_create', methods: ['POST'])]
    public function create(UserCrudService $userCrudService, Request $request, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $createData = $request->toArray();
        return $userCrudService->createUser($createData);
    }

}