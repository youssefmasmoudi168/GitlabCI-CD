<?php

namespace App\Controller;

use App\Entity\Scenario;
use App\Repository\ScenarioRepository;
use App\Repository\UseCaseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use App\Service\DeleteUseCase;

class ScenarioController extends AbstractController
{

    #[Route('/api/scenario/fetch', name: 'app_scenario_fetch', methods: ['GET'])]
    public function fetchAll( ScenarioRepository $scenarioRepository): Response
    {
      
        return $this->json($scenarioRepository->findAll());
    }

    #[Route('/api/scenario/fetch/{id}', name: 'app_scenario_fetch_by_id', methods: ['GET'])]
    public function fetchById( ScenarioRepository $scenarioRepository, $id): Response
    {
      
        return $this->json($scenarioRepository->findOneBy(["id" => $id]));
    }

    #[Route('/api/scenario/create', name: 'app_scenario', methods: ['POST'])]
    public function create(Request $request, ScenarioRepository $scenarioRepository,UseCaseRepository $useCaseRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $data = json_decode($request->getContent(), true);
        $scenario = new Scenario();
        $scenario->setDescription($data['description']);
        $scenario->setDesignation($data['designation']);
        $scenario->setDate(new \DateTimeImmutable());
        $scenario->setCreatedAt(new \DateTimeImmutable());
        $scenario->setUpdatedAt(new \DateTimeImmutable());
        dump($data);
        foreach($data['UseCase'] as $id){
           $useCase= $useCaseRepository->findOneBy(["id"=>$id]);

           $scenario->addUseCase($useCase);
        }
        $scenarioRepository->save($scenario,true);
      
        return $this->json($scenario);
    }


    #[Route('/api/scenario/update/{id}', name: 'app_scenario_update', methods: ['PUT'])]
    public function update(Request $request, ScenarioRepository $scenarioRepository,UseCaseRepository $useCaseRepository, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $data = json_decode($request->getContent(), true);
        
        $scenario = $scenarioRepository->findOneBy(['id' => $id]);
        $scenario->setDescription($data['description']);
        $scenario->setDesignation($data['designation']);
        $scenario->setDate(new \DateTimeImmutable($data['date']));
        $scenario->setUpdatedAt(new \DateTimeImmutable());
        foreach($data['UseCase'] as $id){
           $useCase= $useCaseRepository->findOneBy(["id"=>$id]);

           $scenario->addUseCase($useCase);
        }
        $scenarioRepository->save($scenario,true);
      
        return $this->json($scenario);
    }


    #[Route('/api/scenario/delete/{id}', name: 'app_scenario_delete', methods: ['DELETE'])]
    public function delete( ScenarioRepository $scenarioRepository, $id, Security $security , DeleteUseCase $deleteUseCase): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        }
        $deleteUseCase->deleteTestCaseByScenarioId($id);
        $scenario = $scenarioRepository->findOneBy(['id' => $id]);
        $scenarioRepository->remove($scenario,true);
      
        return $this->json($scenario);
    }
}
