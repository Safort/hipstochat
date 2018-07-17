const auth = require('../auth');

module.exports = ({ router }) => {
  router.get('/api/contacts', auth.isSessionValid, async ctx => {
    const ContactModel = require('../models/contact')(ctx.db);
    const contacts = await ContactModel.getContactsByUserId(ctx.session.userId);
    
    ctx.body = { success: true, contacts };
  });

  router.post('/api/contacts/:contactUserId', auth.isSessionValid, async ctx => {
    const ContactModel = require('../models/contact')(ctx.db);
    const addContactRes = await ContactModel.addContact(ctx.session.userId, ctx.params.contactUserId);

    if (addContactRes) {
      ctx.body = { success: true };
    } else {
      ctx.body = { success: false };
    }
  });

  router.delete('/api/contacts/:contactId', auth.isSessionValid, async ctx => {
    const ContactModel = require('../models/contact')(ctx.db);
    const removeContactRes = await ContactModel.removeContact(ctx.session.userId, ctx.params.contactId);

    if (removeContactRes) {
      ctx.body = { success: true };
    } else {
      ctx.body = { success: false };
    }
  });

};
