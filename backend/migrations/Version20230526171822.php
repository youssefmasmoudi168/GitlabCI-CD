<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526171822 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution ADD rapport_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73A1DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id)');
        $this->addSql('CREATE INDEX IDX_2A0D73A1DFBCC46 ON execution (rapport_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73A1DFBCC46');
        $this->addSql('DROP INDEX IDX_2A0D73A1DFBCC46 ON execution');
        $this->addSql('ALTER TABLE execution DROP rapport_id');
    }
}
