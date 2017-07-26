import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Translation } from "@reactioncommerce/reaction-ui";

class GroupForm extends Component {
  static propTypes = {
    createGroup: PropTypes.func,
    group: PropTypes.object,
    i18nKeyLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    updateGroup: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { name, description } = props.group;

    this.state = {
      name: name || "",
      description: description || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log({ a: nextProps.group });
    const { name, description } = nextProps.group;
    this.setState({ name, description });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.createGroup) {
      return this.props.createGroup(this.state);
    }
    if (this.props.updateGroup) {
      return this.props.updateGroup(this.props.group._id, this.state);
    }
  };

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form className="add-group">
            <div className="form-group">
              <label htmlFor="name">
                <Translation defaultValue="Name" i18nKey="admin.groups.name" />
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="e.g Shop Manager"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <Translation defaultValue="Description" i18nKey="admin.groups.description" />
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.onChange}
                value={this.state.description}
              />
            </div>
            <div className="justify">
              <Button
                status="primary"
                onClick={this.handleSubmit}
                bezelStyle="solid"
                i18nKeyLabel={this.props.i18nKeyLabel}
                label={this.props.submitLabel}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default GroupForm;
