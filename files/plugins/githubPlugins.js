$.plugin({
    name: 'githubPlugins',
    init: function() {
      if (document.getElementById('iframe')) return;
      this.listener = window.addEventListener("message", this.receiveMessage, false);
      $.chat.githubShas = {};
      $('#plugin-container').prepend('<iframe id="githubPlugins" style="border:0;height:50px;width:200px" src="https://fabiendaou.github.io/index.html"></iframe>');
    },
    stop: function() {
      window.removeEventListener("message", this.listener);
      $('#githubPlugins').remove();
    },
    receiveMessage(event) {
      if (event.origin !== "https://fabiendaou.github.io")
        return;
      try {
        const eventData = JSON.parse(event.data);
        console.log(eventData);
        switch (eventData.event) {
          case 'pluginsLoaded':
            for (let plugin of eventData.data) {
                //console.log(plugin);
                
                try {
                    try {
                        // JSON ?
                        let json = JSON.parse(plugin.text);
                        plugin = atob(json.content);
                    } catch(e) { // Raw
                    } finally {
                        eval(plugin.text);
                    }
                } catch (e) { console.error(e); }
                
            }
            break;
          default:
            console.log('Cannot understand message from iframe');
            console.log(eventData);
        }
      } catch(e) {console.error(e);}
    }
});