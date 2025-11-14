import React, { useState } from 'react'
import {
  Card,
  Page,
  Layout,
  Text,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  FormLayout,
  Button,
  ButtonGroup,
  InlineStack,
  BlockStack,
} from '@shopify/polaris'

const FormsDemo = () => {
  const [textFieldValue, setTextFieldValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [multiSelectValue, setMultiSelectValue] = useState([])
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [radioValue, setRadioValue] = useState('standard')
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formRole, setFormRole] = useState('')
  const [formBio, setFormBio] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' }
  ]

  const tagOptions = [
    { label: 'Design', value: 'design' },
    { label: 'Development', value: 'development' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Support', value: 'support' }
  ]

  const roleOptions = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
    { label: 'Other', value: 'other' }
  ]

  return (
    <Page
      title="Forms"
      subtitle="Input fields, selects, checkboxes, and other form controls."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Text Fields
              </Text>

              <FormLayout>
                <TextField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={emailValue}
                  onChange={setEmailValue}
                  helpText="We'll use this to contact you"
                />

                <TextField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={passwordValue}
                  onChange={setPasswordValue}
                />

                <TextField
                  label="Description"
                  placeholder="Enter a description"
                  value={descriptionValue}
                  onChange={setDescriptionValue}
                  multiline={4}
                />

                <TextField
                  label="Username"
                  placeholder="Enter a username"
                  value={textFieldValue}
                  onChange={setTextFieldValue}
                  error="Username must be at least 3 characters"
                />
              </FormLayout>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Select Dropdowns
              </Text>

              <FormLayout>
                <Select
                  label="Country"
                  placeholder="Select a country"
                  options={countryOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                />

                <Select
                  label="Tags"
                  placeholder="Select tags"
                  options={tagOptions}
                  value={multiSelectValue}
                  onChange={setMultiSelectValue}
                  multiple
                />
              </FormLayout>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Checkboxes
              </Text>

              <BlockStack gap="400">
                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={checkboxChecked}
                  onChange={setCheckboxChecked}
                  helpText="You must agree to continue"
                />

                <Checkbox
                  label="Email me updates"
                  checked={emailUpdates}
                  onChange={setEmailUpdates}
                  helpText="We'll send you occasional updates about new features"
                />

                <Checkbox
                  label="Enable notifications"
                  checked={false}
                  onChange={() => {}}
                  error="This feature is currently unavailable"
                  disabled
                />
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Radio Buttons
              </Text>

              <BlockStack gap="400">
                <Text variant="headingSm" as="h3">
                  Shipping Method
                </Text>

                <RadioButton
                  label="Standard Shipping (5-7 days)"
                  checked={radioValue === 'standard'}
                  id="standard"
                  name="shipping"
                  onChange={() => setRadioValue('standard')}
                />

                <RadioButton
                  label="Express Shipping (2-3 days)"
                  checked={radioValue === 'express'}
                  id="express"
                  name="shipping"
                  onChange={() => setRadioValue('express')}
                />

                <RadioButton
                  label="Overnight Shipping (1 day)"
                  checked={radioValue === 'overnight'}
                  id="overnight"
                  name="shipping"
                  onChange={() => setRadioValue('overnight')}
                />
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: 'var(--p-space-6)' }}>
              <Text variant="headingMd" as="h2">
                Form Layout Example
              </Text>

              <FormLayout>
                <TextField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formName}
                  onChange={setFormName}
                  required
                />

                <TextField
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formEmail}
                  onChange={setFormEmail}
                  required
                />

                <Select
                  label="Role"
                  placeholder="Select your role"
                  options={roleOptions}
                  value={formRole}
                  onChange={setFormRole}
                  required
                />

                <TextField
                  label="Bio"
                  placeholder="Tell us about yourself"
                  value={formBio}
                  onChange={setFormBio}
                  multiline={3}
                />

                <Checkbox
                  label="I agree to the privacy policy"
                  checked={privacyAccepted}
                  onChange={setPrivacyAccepted}
                  required
                />

                <InlineStack gap="300">
                  <Button variant="primary" onClick={() => {}}>
                    Submit
                  </Button>
                  <Button onClick={() => {}}>
                    Cancel
                  </Button>
                </InlineStack>
              </FormLayout>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default FormsDemo