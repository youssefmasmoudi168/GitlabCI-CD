<?php

namespace App\Entity;

use App\Repository\RapportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RapportRepository::class)]
class Rapport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\OneToMany(mappedBy: 'rapport', targetEntity: Execution::class)]
    private Collection $Execution;

   

    #[ORM\ManyToMany(targetEntity: Scenario::class, inversedBy: 'rapports')]
    private Collection $scenario;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->Execution = new ArrayCollection();
        $this->scenario = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection<int, Execution>
     */
    public function getExecution(): Collection
    {
        return $this->Execution;
    }

    public function addExecution(Execution $execution): self
    {
        if (!$this->Execution->contains($execution)) {
            $this->Execution->add($execution);
            $execution->setRapport($this);
        }

        return $this;
    }

    public function removeExecution(Execution $execution): self
    {
        if ($this->Execution->removeElement($execution)) {
            // set the owning side to null (unless already changed)
            if ($execution->getRapport() === $this) {
                $execution->setRapport(null);
            }
        }

        return $this;
    }

    

    /**
     * @return Collection<int, Scenario>
     */
    public function getScenario(): Collection
    {
        return $this->scenario;
    }

    public function addScenario(Scenario $scenario): self
    {
        if (!$this->scenario->contains($scenario)) {
            $this->scenario->add($scenario);
        }

        return $this;
    }

    public function removeScenario(Scenario $scenario): self
    {
        $this->scenario->removeElement($scenario);

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


}
