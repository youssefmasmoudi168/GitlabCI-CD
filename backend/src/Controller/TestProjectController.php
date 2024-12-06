<?php

namespace App\Controller;

use App\Entity\TestProject;
use App\Entity\Affectation;
use App\Repository\TestProjectRepository;
use App\Repository\UserRepository;
use App\Repository\AffectationRepository;
use App\Service\DeleteSprint;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

class TestProjectController extends AbstractController
{

    #[Route('/api/testProject/fetch', name: 'api_testproject_fetch', methods: ['GET'])]
    public function fetch(TestProjectRepository $testProjectRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
        //$user = $this->container->get('security.token_storage')->getToken()->getUser();

        return $this->json($testProjectRepository->findAll());

    }

    #[Route('/api/testProject/user/{user_id}', name: 'api_testproject_fetch_by_user_id', methods: ['GET'])]
    public function fetchByUserId($user_id, UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneBy(['id' => $user_id]);
        $affectations = $user->getAffectations()->getValues();
        $projects = array();
        foreach ($affectations as $key => $value) {  
            $projects[] = $value->getProjet()[0];
           
        }
        return $this->json($projects);

    }

    #[Route('/api/testProject/users/fetch/{project_id}', methods: ['GET'])]
    public function fetchUsersAffectedInProjectId($project_id, TestProjectRepository $testProjectRepository,  Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $testProject = $testProjectRepository->findOneBy(['id' => $project_id]);
        $affectations = $testProject->getAffectations()->getValues();
        $users = array();
        foreach ($affectations as $key => $value) {
            $users[] = $value->getUser()->getValues();
        }
        return $this->json($users);

    }

    #[Route('/api/testProject/users/add/{project_id}', methods: ['POST'])]
    public function addUsersToAffectedInProjectId($project_id,AffectationRepository $af,UserRepository $userRepository, TestProjectRepository $testProjectRepository, Request $request, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }

        $testProject = $testProjectRepository->findOneBy(['id' => $project_id]);
        // dd($testProject);
        $affectations = $testProject->getAffectations()->getValues();
        // dump($request);
        $user = $userRepository->findOneBy(['id' => $request->toArray()['id']]);
        $users = array();
        foreach ($affectations as $key => $value) {
            $value->addUser($user);
            $users[] = $value->getUser()->getValues();
            $af->save($value, true);

        }
        return $this->json($users);

    }

    #[Route('/api/testProject/users/remove/{project_id}', methods: ['PUT'])]
    public function removeUsersFromAffectedInProjectId($project_id,AffectationRepository $af,UserRepository $userRepository, TestProjectRepository $testProjectRepository, Request $request, Security $security): JsonResponse
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }

        $testProject = $testProjectRepository->findOneBy(['id' => $project_id]);
        $affectations = $testProject->getAffectations()->getValues();
        $user = $userRepository->findOneBy(['id' => $request->toArray()['id']]);
        $users = array();
        foreach ($affectations as $key => $value) {
            $value->removeUser($user);
            $users[] = $value->getUser()->getValues();
            $af->save($value, true);
        }
        return $this->json($users);

    }



    #[Route('/api/testProject/fetch/{id}', name: 'api_testproject_fetch_by_id', methods: ['GET'])]
    public function fetchById(TestProjectRepository $testProjectRepository, $id): Response
    {
        return $this->json([
            'testproject' => $testProjectRepository->findOneBy(['id' => $id]),
        ]);
    }

    #[Route('/api/testProject/create', name: 'api_testproject_create', methods: ['POST'])]
    public function create(Request $request, AffectationRepository $af, TestProjectRepository $testProjectRepository, UserRepository $userRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $testProject = new TestProject();
        $data = $request->toArray();
        $user = $userRepository->findOneBy(["id" => $data['user']]);
        $testProject->setProjectName($data['projectName']);
        $testProject->setAuthor($data['author']);
        $testProject->setClient($data['client']);
        $testProject->setCreationDate(new \DateTimeImmutable($data['dateCreation']));
        $testProject->setCreatedAt(new \DatetimeImmutable());
        $testProject->setUpdatedAt(new \DatetimeImmutable());
        $testProjectRepository->save($testProject, true);

        
        $affectation = new Affectation();
        $affectation->addUser($user);
        $affectation->setDate(new \DatetimeImmutable());
        $affectation->addProjet($testProject);
        $affectation->setResponsable($user);
        $af->save($affectation, true);


        return $this->json([
            'testProject' => $testProject,
        ]);

    }

    #[Route('/api/testProject/update/{id}', name: 'app_testproject_update_by_id', methods: ['PUT'])]
    public function updateById(Request $request, TestProjectRepository $testProjectRepository, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN'){
            return $this->json('user unauthorized',401);
        }
        $data = $request->toArray();
        $testProject = $testProjectRepository->findOneBy(['id' => $id]);

        $testProject->setProjectName($data['projectName']);
        $testProject->setAuthor($data['author']);
        $testProject->setClient($data['client']);
        $testProject->setCreationDate(new \DateTimeImmutable($data['dateCreation']));
        $testProject->setUpdatedAt(new \DatetimeImmutable());

        $testProjectRepository->save($testProject, true);

        return $this->json([
            'testProject' => $testProject,
        ]);
    }

    #[Route('/api/testProject/delete/{id}', name: 'api_testproject_delete_by_id', methods: ['DELETE'])]
    public function deleteById(Request $request, $id, TestProjectRepository $testProjectRepository, DeleteSprint $deleteSprint): Response
    {
        $testProject = $testProjectRepository->findOneBy(['id' => $id]);
        $affectations = $testProject->getAffectations()->getValues();

        $deleteSprint->deleteSprintByTestProjectId($id);
        $testProjectRepository->remove($testProject, true);

        return $this->json([
            'message' => 'testProject was deleted',
        ]);
    }
}