var EvolutionCard = function(game) {
    this.game = game;
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
}

EvolutionCard.prototype = {
    preload: function() {
        this.game.load.image('checkbox_no', '../assets/images/checkbox_no.png');
        this.game.load.image('checkbox_yes', '../assets/images/checkbox_yes.png');
    },
    create: function() {
        this.game.stage.backgroundColor = '#ffffff';

        var text = "EVOLUTION CARD";
        var titleStyle = { font: "65px Arial", fill: "#01579b", align: "center" };
        var traitStyle = { font: "30px Arial", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: this.game.width/3 - 50};

        var t = this.game.add.text(this.game.world.centerX-300, 0, text, titleStyle);
        for (i = 0; i < this.card.length; i++) {
            for (j = 0; j < this.card[i].traits.length; j++) {
                x = this.game.width/3*i;
                y = 100+(this.game.height/4*j);
                trait = this.card[i].traits[j];
                this.game.add.text(50+x, y, trait.description, traitStyle);
                traitImage = trait.hasTrait ? 'checkbox_yes' :'checkbox_no';
                // var img = this.game.add.image(this.game.width/3*i, 100+(this.game.height/4*j), traitImage);
                // img.scale.setTo(0.05, 0.05);
                // img.inputEnabled = true;
                // img.events.onInputDown.add(this.evolve, this.card[i].traits[j], img);
                this.button = this.game.add.button(x, y, traitImage, this.evolve, this);
                this.button.scale.setTo(0.05, 0.05);
            }
        }
        
    },
    update: function() {

    },
    render: function() {

    },
    evolve: function(button) {
        trait.hasTrait = !trait.hasTrait;
        this.game.state.start('board', false, false, this.game);
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
    return {
        stage: stage,
        description: description,
        hasTrait: hasTrait
    }
}