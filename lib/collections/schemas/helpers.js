import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { getShopId } from "/lib/api";

/**
 * shopIdAutoValue
 * @summary used for schema injection autoValue
 * @example autoValue: shopIdAutoValue
 * @return {String} returns current shopId
 */
export function shopIdAutoValue() {
  // we should always have a shopId
  if (this.isSet && Meteor.isServer) {
    return this.value;
  } else if (Meteor.isServer && !this.isUpdate || Meteor.isClient && this.isInsert) {
    return getShopId();
  }
  return this.unset();
}

/**
 * shopSlugAutoValue
 * @summary used for schema injection autoValue
 * @example autoValue: shopSlugAutoValue
 * @return {String} returns current shopSlug
 */
export function shopSlugAutoValue() {
  // we should always have a shopSlug
  if (this.isSet && Meteor.isServer) {
    return this.value;
  } else if (Meteor.isServer && !this.isUpdate || Meteor.isClient && this.isInsert) {
    const shop = Reaction.getSellerShop(this.userId);
    console.log(shop.slug, shop.name);
    return shop.slug;
  }
  return this.unset();
}

/**
 * schemaIdAutoValue
 * @summary used for schema injection autoValue
 * @example autoValue: schemaIdAutoValue
 * @return {String} returns randomId
 */
export function schemaIdAutoValue() {
  if (this.isSet && Meteor.isServer) {
    return this.value;
  } else if (Meteor.isServer && this.operator !== "$pull" ||
    Meteor.isClient && this.isInsert) {
    return Random.id();
  }
  return this.unset();
}
