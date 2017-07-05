import { Reaction } from "/client/api";
import { Shops } from "/lib/collections";

// TODO: This button should use our React component
Template.stripeConnectSignupButton.helpers({
  /**
   * Give it a size and style
   * @return {String} The classes
   */
  classes() {
    const classes = [
      (this.type || "btn-info"),
      (this.size || "")
    ];

    return classes.join(" ");
  }
});

Template.stripeConnectSignupButton.events({
  "click [data-event-action='button-click-stripe-signup']": function () {
    const shopId = Reaction.getShopId();
    const shop = Shops.findOne({ _id: shopId });
    // const marketplaceId = Reaction.getMarketplaceId();
    // const stripeClientId = Reaction.getPackageSettings({
    //   name: stripe,
    //   shopId: marketplaceId
    // });

    // TEST ONLY - hard code stripe client id
    const stripeClientId = "ca_AY0QPPR9xdwlF7OHa3mxIZkMiVCMBKgE";

    // If we don't have a shop, or if the active shop doesn't have an address
    // or an email, prompt
    if (!shop) {
      return console.log("Shop not found!");
    }

    if (Array.isArray(shop.addressBook) || shop.addressBook.length === 0) {
      return console.log("Please add an address first!");
    }

    if (!Array.isArray(shop.emails) || shop.emails.length === 0) {
      return console.log("Please add an email first!");
    }

    const email = shop.emails[0].address;
    const country = shop.addressBook[0].country;
    const phoneNumber = shop.addressBook[0].phone;
    const businessName = shop.addressBook[0].company;
    const streetAddress = shop.addressBook[0].address1;
    const city = shop.addressBook[0].city;
    const state = shop.addressBook[0].state;
    const zip = shop.addressBook[0].postal;

    const autofillParams = `&stripe_user[email]=${email}&stripe_user[country]=${country}&stripe_user[phone_number]=${phoneNumber}&stripe_user[business_name]=${businessName}&stripe_user[street_address]=${streetAddress}&stripe_user[city]=${city}&stripe_user[state]=${state}&stripe_user[zip]=${zip}`; // eslint-disable-line max-len
    window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${stripeClientId}&scope=read_write` + autofillParams;
  }
});
