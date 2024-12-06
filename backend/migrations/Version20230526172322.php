<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526172322 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE rapport_scenario (rapport_id INT NOT NULL, scenario_id INT NOT NULL, INDEX IDX_EA85285A1DFBCC46 (rapport_id), INDEX IDX_EA85285AE04E49DF (scenario_id), PRIMARY KEY(rapport_id, scenario_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rapport_scenario ADD CONSTRAINT FK_EA85285A1DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rapport_scenario ADD CONSTRAINT FK_EA85285AE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rapport_scenario DROP FOREIGN KEY FK_EA85285A1DFBCC46');
        $this->addSql('ALTER TABLE rapport_scenario DROP FOREIGN KEY FK_EA85285AE04E49DF');
        $this->addSql('DROP TABLE rapport_scenario');
    }
}
