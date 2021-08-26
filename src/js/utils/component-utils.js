class ComponentUtils {
  static render(component, target) {
    ComponentUtils.checkComponent(component);
    target.innerHTML = component.render();
    component.componentDidRender(target);
  }

  static checkComponent(component) {
    if (!(component instanceof HtmlComponent)) {
      throw new Error('ComponentUtils requires instances of HtmlComponent.');
    }
  }
}
