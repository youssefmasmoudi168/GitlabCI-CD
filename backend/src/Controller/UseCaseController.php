<?php

namespace App\Controller;

use App\Entity\UseCase;
use App\Repository\UseCaseRepository;
use App\Repository\SprintRepository;
use App\Service\DeleteTestCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

class UseCaseController extends AbstractController
{

    #[Route('/api/usecase/fetch', name: 'api_usecase_fetch', methods: ['GET'])]
    public function fetch(UseCaseRepository $useCaseRepository, SerializerInterface $serializer): JsonResponse
    {

        $useCase = $useCaseRepository->findBy(["scenario" => null]);
        $json = $serializer->serialize(
            $useCase,
            JsonEncoder::FORMAT,

        );
        return new JsonResponse($json, 200, ['application/json'], true);
    }


    #[Route('/api/usecase/sprint/{sprint_id}', name: 'api_sprint_fetch_by_sprint_id', methods: ['GET'])]
    public function fetchBySprintId($sprint_id, SprintRepository $sprintRepository, SerializerInterface $serializer): JsonResponse
    {
        $sprint = $sprintRepository->findOneBy(['id' => $sprint_id]);
        $use_cases = $sprint->getUseCases();
        $json = $serializer->serialize(
            $use_cases,
            JsonEncoder::FORMAT,

        );
        return new JsonResponse($json, 200, ['application/json'], true);
    }

    #[Route('/api/usecase/fetch/scenario/{scenario_id}', name: 'api_sprint_fetch_by_scenario_id', methods: ['GET'])]
    public function fetchByScenarioId($scenario_id, UseCaseRepository $useCaseRepository): JsonResponse
    {
        
        $useCases = $useCaseRepository->findBy(["scenario" => $scenario_id]);

        return $this->json($useCases);
        
    }

    #[Route('/api/usecase/fetch/{id}', name: 'api_usecase_fetch_by_id', methods: ['GET'])]
    public function fetchById(UseCaseRepository $useCaseRepository, $id): Response
    {
        return $this->json([
            'useCase' => $useCaseRepository->findOneBy(['id' => $id]),
        ]);
    }

    #[Route('/api/usecase/create', name: 'api_usecase_create', methods: ['POST'])]
    public function create(Request $request, UseCaseRepository $useCaseRepository, SprintRepository $sprintRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $useCase = new UseCase();
        $data = $request->toArray();
        $sprint = $sprintRepository->findOneBy(["id" => $data['sprint']]);
        $useCase->setTitle($data['title']);
        $useCase->setPrereq($data['prereq']);
        $useCase->setExpectedResult($data['expectedResult']);
        $useCase->setSprint($sprint);
        $useCase->setCreatedAt(new \DatetimeImmutable());
        $useCase->setUpdatedAt(new \DatetimeImmutable());

        $useCaseRepository->save($useCase, true);

        return $this->json([
            'useCase' => $useCaseRepository,
        ]);

    }

    #[Route('/api/usecase/update/{id}', name: 'app_usecase_show', methods: ['PUT'])]
    public function updateById(Request $request, UseCaseRepository $useCaseRepository, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $data = $request->toArray();
        $useCase = $useCaseRepository->findOneBy(['id' => $id]);

        $useCase->setTitle($data['title']);
        $useCase->setPrereq($data['prereq']);
        $useCase->setExpectedResult($data['expectedResult']);
        $useCase->setUpdatedAt(new \DatetimeImmutable());

        $useCaseRepository->save($useCase, true);

        return $this->json([
            'useCase' => $useCase,
        ]);
    }

    #[Route('/api/usecase/delete/{id}', name: 'api_usecase_delete_by_id', methods: ['DELETE'])]
    public function deleteById(Request $request, UseCaseRepository $useCaseRepository, DeleteTestCase $deleteTestCase, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        }  
        $useCase = $useCaseRepository->findOneBy(['id' => $id]);
        $deleteTestCase->deleteTestCaseByUseCaseId($id);
        $useCaseRepository->remove($useCase, true);

        return $this->json([
            'message' => 'useCase ' . $id . ' was deleted',
        ]);
    }

    #[Route('/api/usecase/delete', name: 'api_usecase_delete', methods: ['DELETE'])]
    public function delete(Request $request, UseCaseRepository $useCaseRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $useCases = $useCaseRepository->findAll();

        foreach ($useCases as $useCase) {
            $useCaseRepository->remove($useCase, true);
        }
        return $this->json([
            'message' => 'All Use cases were deleted',
        ]);
    }
}