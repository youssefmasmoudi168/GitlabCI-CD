<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526165716 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73A1DFBCC46');
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73AE04E49DF');
        $this->addSql('DROP INDEX IDX_2A0D73A1DFBCC46 ON execution');
        $this->addSql('DROP INDEX IDX_2A0D73AE04E49DF ON execution');
        $this->addSql('ALTER TABLE execution DROP scenario_id, DROP rapport_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution ADD scenario_id INT NOT NULL, ADD rapport_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73A1DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73AE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_2A0D73A1DFBCC46 ON execution (rapport_id)');
        $this->addSql('CREATE INDEX IDX_2A0D73AE04E49DF ON execution (scenario_id)');
    }
}
