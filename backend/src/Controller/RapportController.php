<?php

namespace App\Controller;

use App\Entity\Rapport;
use App\Repository\ExecutionRepository;
use App\Repository\RapportRepository;
use App\Repository\ScenarioRepository;
use App\Repository\TestCaseRepository;
use App\Repository\UseCaseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;

class RapportController extends AbstractController
{
    #[Route('/api/rapport/fetch', methods: ['GET'])]
    public function fetchAll( RapportRepository $rapportRepository): Response
    {
      
        return $this->json($rapportRepository->findAll());
    }

    #[Route('/api/rapport/fetch/{id}', methods: ['GET'])]
    public function fetchById( RapportRepository $rapportRepository, $id): Response
    {
      
        return $this->json($rapportRepository->findOneBy(["id" => $id]));
    }

    #[Route('/api/rapport/create', methods: ['POST'])]
    public function create(Request $request,
                           RapportRepository   $rapportRepository,
                           ScenarioRepository $scenarioRepository, 
                           ExecutionRepository $executionRepository,
                           TestCaseRepository $testCaseRepository,
                           UseCaseRepository $useCaseRepository,
                           Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $data = json_decode($request->getContent(), true);

        $rapport = new Rapport();
        $rapport->addScenario($scenarioRepository->findOneBy(["id" =>$data['scenario']]));
        $rapport->setDate(new \DateTimeImmutable());
        $rapport->setCreatedAt(new \DateTimeImmutable());
        $rapport->setUpdatedAt(new \DateTimeImmutable());

        $rapportRepository->save($rapport,true);

        $lastRapport  = $rapportRepository->findOneBy([], ['id' => 'DESC']);
        $scenarios = $lastRapport->getScenario()->getValues();
        foreach($scenarios as $scenario){
            $scenarioId = $scenarioRepository->findOneBy(["id" =>$data['scenario']])->getId();
            if($scenario->getId() == $scenarioId){
                $useCases = $useCaseRepository->findBy(["scenario" => $scenarioId]);
                // $testCases = array();
                foreach ( $useCases as $useCase ){
                    $testCases[] = $testCaseRepository->findBy(["useCase" => $useCase]);
                }
                // $executions = array();
                foreach($testCases as $testCase) {
                    $executions[] = $executionRepository->findBy(["testCase" => $testCase]);
                }
                foreach($executions as $execution){
                    foreach($execution as $exec){
                        // dd($exec);
                        $exec->setRapport($lastRapport);
                        $executionRepository->save($exec,true);
                    }
                    
                }
            }
        }
        
        return $this->json($rapport);

    }
}
