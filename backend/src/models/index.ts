/**
 * SchemaFields type to keep mongoose model in sync with interface.
 *
 * Note: only field keys (not values) are enforced.
 * @template IModel interface for your model to enforce certain fields
 * @example
 * interface IUser {}
 * const UserSchemaFields: SchemaFields<IUser> = {}
 */
type SchemaFields<IModel> = Record<keyof IModel, any>;

export default SchemaFields;
