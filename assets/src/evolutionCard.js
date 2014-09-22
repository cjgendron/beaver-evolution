var EvolutionCard = function(main, group) {
    this.main = main;
    this.game = main.game;
    this.group = group;
    this.card = [
        Category("Craftsmanship", 0, [
                Trait(0, "+2 dam blocks while building", false),
                Trait(1, "Only 50% population lost on poachers", false),
                Trait(2, "Only 50% loss on flood", false)
            ]),
        Category("Craftsmanship", 0, [
                Trait(0, "Lumberjack only affects for one turn", false),
                Trait(1, "Only 25% loss on tornado", false),
                Trait(2, "Can increase population by 50% when populating", false)
            ]),
        Category("Craftsmanship", 0, [
                Trait(0, "No population loss for famine", false),
                Trait(1, "Only 25% loss on draught", false),
                Trait(2, "Only 50% dam loss on fire", false)
            ]),
    ];
    this.createEvolutionCard();
}

EvolutionCard.prototype = {
    getEvolutionCard: function() {
        return this.card;
    },
    createEvolutionCard: function() {
        var titleStyle = { font: "65px Arial", fill: "#01579b", align: "center" };
        var traitStyle = { font: "30px Arial", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: this.game.width/3 - 50};

        var text = "EVOLUTION CARD";
        this.group.add(new Phaser.Text(this.game, this.game.world.centerX-300, 0, text, titleStyle));

        for (i = 0; i < this.card.length; i++) {
            for (j = 0; j < this.card[i].traits.length; j++) {
                trait = this.card[i].traits[j];
                trait.setX(this.game.width/3*i);
                trait.setY(100+(this.game.height/4*j));
                trait.setText(new Phaser.Text(this.game, 50+trait.getX(), trait.getY(), trait.description, traitStyle));
                this.group.add(trait.getText());
                trait.setButton(new Phaser.Button(this.game, trait.getX(), trait.getY(), trait.getTraitImage(), this.evolve, this));
                this.group.add(trait.getButton());
            }
        }
    },
    evolve: function(button) {
        trait.hasTrait = !trait.hasTrait;
        // switch states
    },
    show: function() {
        this.group.visible = true;
    },
    hide: function() {
        this.group.visible = false;
    }
}

var Category = function(name, highestStage, traits) {
    return {
        name: name,
        highestStage: highestStage,
        traits: traits,
    }
}

var Trait = function(stage, description, hasTrait) {
    this.xCoordinate;
    this.yCoordinate;
    this.button;
    this.text;
    return {
        stage: stage,
        description: description,
        hasTrait: hasTrait,
        setX: function(x) {
            this.xCoordinate = x;
        },
        setY: function(y) {
            this.yCoordinate = y;
        },
        getX: function() {
            return this.xCoordinate;
        },
        getY: function() {
            return this.yCoordinate;
        },
        getTraitImage: function() {
            return this.hasTrait ? 'checkbox_yes' :'checkbox_no';
        },
        setButton: function(button) {
            this.button = button;
        },
        getButton: function() {
            return this.button;
        },
        setText: function(text) {
            this.text = text
        },
        getText: function() {
            return this.text;
        }
    }
}