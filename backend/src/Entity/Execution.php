<?php

namespace App\Entity;

use App\Repository\ExecutionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExecutionRepository::class)]
class Execution
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateExecution = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $support = null;

 



    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'execution')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TestCase $testCase = null;

    #[ORM\ManyToOne(inversedBy: 'Execution')]
    private ?Rapport $rapport = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateExecution(): ?\DateTimeInterface
    {
        return $this->dateExecution;
    }

    public function setDateExecution(\DateTimeInterface $dateExecution): self
    {
        $this->dateExecution = $dateExecution;

        return $this;
    }

    public function getSupport(): ?string
    {
        return $this->support;
    }

    public function setSupport(?string $support): self
    {
        $this->support = $support;

        return $this;
    }



    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getTestCase(): ?TestCase
    {
        return $this->testCase;
    }

    public function setTestCase(?TestCase $testCase): self
    {
        $this->testCase = $testCase;

        return $this;
    }

    public function getRapport(): ?Rapport
    {
        return $this->rapport;
    }

    public function setRapport(?Rapport $rapport): self
    {
        $this->rapport = $rapport;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }
}
