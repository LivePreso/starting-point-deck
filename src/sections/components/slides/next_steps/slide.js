new Slide({
  onRendered() {
    /*  
     const company = _.find(user.profile.group_set, group => group.advisor_status);
     if (company && company.hex && `#${company.hex}`) {
       globalDeck.colourMap.update('brand', `#${company.hex}`);
     }
      */
    //const { user } = this.feeds;
    const company = {};

    const user = Bridge.Envs.getDict().user;
    user.fullName = `${user.first_name} ${user.last_name}`;
    user.phone = user.profile && user.profile.phone ? user.profile.phone : '';
    this.utils.injectDataValues(this.$pageContainer, user);

    // {first_name: "hugh", last_name: 'c', email:'hughc@livepreso.com', profile: {preferred_phone:"0411451995", }};
    this.slideApp = new NextStepsSlide(this.id, {
      slide: this,
      persistent: true,
      advisor: `${user.first_name} ${user.last_name}`,
      intro: getCompanywide(
        `${this.id}-intro`,
        /* html */ `
          Lorem ipsum dolor sit amet consectetur adipiscing elitsed eiusmod tempor incidute <br>
          Utenim ad minim veniam quis nostrud exercitation aliquip commodo finite.
        `
      )
    });
    ComponentUtils.render(this.slideApp, this.utils.findEl('#next_steps_root'));
  },
  onReady(e, done) {
    if (!$('body').hasClass('edit-mode')) {
      this.slideApp.initialize();
      this.slideApp.setState(Bridge.Context.match('.next_steps', {}));
    }
    done();
  },
  onClose() {
    this.slideApp.dragList.destroy();
    this.slideApp.destroy();
  }
});
