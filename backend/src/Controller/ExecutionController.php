<?php

namespace App\Controller;

use App\Entity\Execution;
use App\Repository\ExecutionRepository;
use App\Repository\ScenarioRepository;
use App\Repository\TestCaseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;

class ExecutionController extends AbstractController
{

    #[Route('/api/execution/fetch', methods: ['GET'])]
    public function fetchAll( ExecutionRepository $executionRepository): Response
    {
        return $this->json($executionRepository->findAll());
    }

    #[Route('/api/execution/fetch/{id}', methods: ['GET'])]
    public function fetchById( ExecutionRepository $executionRepository, $id): Response
    {
      
        return $this->json($executionRepository->findOneBy(["id" => $id]));
    }


    #[Route('/api/execution/create', name: 'app_execution')]
    public function create(Request $request, ExecutionRepository   $executionRepository, TestCaseRepository $testCaseRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $data = json_decode($request->getContent(), true);

        $execution = new Execution();
        $execution->setTestCase($testCaseRepository->findOneBy(["id" =>$data['testCase']]));
        $execution->setEtat($data['etat']);
        $execution->setSupport($data['support']);
        $execution->setDateExecution(new \DateTimeImmutable());
        $execution->setCreatedAt(new \DateTimeImmutable());
        $execution->setUpdatedAt(new \DateTimeImmutable());

        $executionRepository->save($execution,true);
        
        return $this->json($execution);

    }
}
