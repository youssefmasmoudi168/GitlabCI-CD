<?php

namespace App\Controller;

use App\Entity\Sprint;
use App\Repository\ExecCampaignRepository;
use App\Repository\SprintRepository;
use App\Repository\TestProjectRepository;
use App\Service\DeleteUseCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class SprintController extends AbstractController
{

    #[Route('/api/sprint/fetch', name: 'api_sprint_fetch', methods: ['GET'])]
    public function fetch(SprintRepository $sprintRepository, SerializerInterface $serializer): JsonResponse
    {
        $sprint = $sprintRepository->findAll();
        $json = $serializer->serialize(
            $sprint,
            JsonEncoder::FORMAT,

        );
        return new JsonResponse($json, 200, ['application/json'], true);
    }

    #[Route('/api/sprint/project/{project_id}', name: 'api_sprint_fetch_by_project_id', methods: ['GET'])]
    public function fetchByProjectId(TestProjectRepository $testProjectRepository, $project_id, SerializerInterface $serializer): JsonResponse
    {
        $project = $testProjectRepository->findOneBy(['id' => $project_id]);
        $sprints = $project->getSprints();
        $json = $serializer->serialize(
            $sprints,
            JsonEncoder::FORMAT,

        );
        return new JsonResponse($json, 200, ['application/json'], true);
    }

    #[Route('/api/sprint/fetch/{id}', name: 'api_sprint_fetch_by_id', methods: ['GET'])]
    public function fetchById(SprintRepository $sprintRepository, $id): Response
    {
        return $this->json([
            'sprint' => $sprintRepository->findOneBy(['id' => $id]),
        ]);
    }

    #[Route('/api/sprint/create', name: 'api_sprint_create', methods: ['POST'])]
    public function create(Request $request, SprintRepository $sprintRepository, TestProjectRepository $testProjectRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $sprint = new Sprint();
        $data = $request->toArray();
        $testProject = $testProjectRepository->findOneBy(["id" => $data['testProject']]);
        $sprint->setSprintName($data['sprintName']);
        $sprint->setPriority($data['priority']);
        $sprint->setUserStory($data['userStory']);
        $sprint->setStartDate(new \DatetimeImmutable($data['startDate']));
        $sprint->setEndDate(new \DatetimeImmutable($data['endDate']));
        $sprint->setProject($testProject);
        $sprint->setCreatedAt(new \DatetimeImmutable());
        $sprint->setUpdatedAt(new \DatetimeImmutable());

        $sprintRepository->save($sprint, true);

        return $this->json([
            'sprint' => $sprint,
        ]);

    }

    #[Route('/api/sprint/update/{id}', name: 'api_sprint_update_by_id', methods: ['PUT'])]
    public function updateById(Request $request, SprintRepository $sprintRepository, $id, Security $security): Response
    {
        /* if($security->getUser()->getRoles()[0]!= 'ROLE_ADMIN' || $security->getUser()->getRoles()[0]!= 'ROLE_TESTOR'){
            return $this->json('user unauthorized',401);
        }  */

        $data = $request->toArray();
        $sprint = $sprintRepository->findOneBy(['id' => $id]);

        $sprint->setSprintName($data['sprintName']);
        $sprint->setPriority($data['priority']);
        $sprint->setUserStory($data['userStory']);
        $sprint->setStartDate(new \DatetimeImmutable($data['startDate']));
        $sprint->setEndDate(new \DatetimeImmutable($data['endDate']));
        $sprint->setUpdatedAt(new \DatetimeImmutable());

        $sprintRepository->save($sprint, true);

        return $this->json([
            'sprint' => $sprint,
        ]);
    }

    #[Route('/api/sprint/delete/{id}', name: 'api_sprint_delete_by_id', methods: ['DELETE'])]
    public function deleteById(Request $request, SprintRepository $sprintRepository, DeleteUseCase $deleteUseCase, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $execcampaign = $sprintRepository->findOneBy(['id' => $id]);
        $deleteUseCase->deleteTestCaseBySprintId($id);
        $sprintRepository->remove($execcampaign, true);

        return $this->json([
            'message' => 'sprint ' . $id . ' was deleted',
        ]);
    }

    #[Route('/api/sprint/delete', name: 'api_sprint_delete', methods: ['DELETE'])]
    public function delete(Request $request, SprintRepository $sprintRepository , Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        }  
        $sprints = $sprintRepository->findAll();
        

        foreach ($sprints as $sprint) {
            $sprintRepository->remove($sprint, true);
        }
        return $this->json([
            'message' => 'All sprints were deleted',
        ]);
    }
}