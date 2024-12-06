<?php

namespace App\Entity;

use App\Repository\AffectationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AffectationRepository::class)]
class Affectation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: user::class, inversedBy: 'affectations')]
    private Collection $user;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToMany(targetEntity: TestProject::class, inversedBy: 'affectations')]
    private Collection $projet;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $responsable = null;

    public function __construct()
    {
        $this->user = new ArrayCollection();
        $this->projet = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, user>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(user $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
        }

        return $this;
    }

    public function removeUser(user $user): self
    {
        $this->user->removeElement($user);

        return $this;
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
     * @return Collection<int, TestProject>
     */
    public function getProjet(): Collection
    {
        return $this->projet;
    }

    public function addProjet(TestProject $projet): self
    {
        if (!$this->projet->contains($projet)) {
            $this->projet->add($projet);
        }

        return $this;
    }

    public function removeProjet(TestProject $projet): self
    {
        $this->projet->removeElement($projet);

        return $this;
    }

    public function getResponsable(): ?user
    {
        return $this->responsable;
    }

    public function setResponsable(?user $responsable): self
    {
        $this->responsable = $responsable;

        return $this;
    }
}
