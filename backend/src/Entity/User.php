<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    // const ROLES = ['ROLE_USER', 'ROLE_TESTER', 'ROLE_ADMIN'];

    #[Groups(['users'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['users'])]
    #[ORM\Column(name: 'email', length: 255, unique: true)]
    #[Assert\Email]
    #[Assert\NotBlank(message: "Email is required")]
    private ?string $email = null;

    #[Groups(['users'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Password is required")]
    private ?string $password = null;

    #[Groups(['users'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "First name is required")]
    private ?string $first_name = null;

    #[Groups(['users'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Last name is required")]
    private ?string $last_name = null;

    #[Groups(['users'])]
    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[Groups(['users'])]
    #[ORM\Column]
    private ?bool $is_verified = false;

    #[Groups(['users'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['users'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

   

    #[ORM\Column]
    private ?bool $isActive = true;

    #[ORM\ManyToMany(targetEntity: Affectation::class, mappedBy: 'user')]
    private Collection $affectations;

    public function __construct()
    {
        $this->affectations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_VISITOR';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->is_verified;
    }

    public function setIsVerified(bool $is_verified): self
    {
        $this->is_verified = $is_verified;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }
    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials()
    {

    }


    public function getCreatedAt(): ?\DateTimeImmutable
    {
        $createdAt = $this->createdAt;
        return $createdAt;
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

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * @return Collection<int, Affectation>
     */
    public function getAffectations(): Collection
    {
        return $this->affectations;
    }

    public function addAffectation(Affectation $affectation): self
    {
        if (!$this->affectations->contains($affectation)) {
            $this->affectations->add($affectation);
            $affectation->addUser($this);
        }

        return $this;
    }

    public function removeAffectation(Affectation $affectation): self
    {
        if ($this->affectations->removeElement($affectation)) {
            $affectation->removeUser($this);
        }

        return $this;
    }

}