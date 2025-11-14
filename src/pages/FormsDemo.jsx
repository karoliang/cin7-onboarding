import React, { useState } from 'react'

const FormsDemo = () => {
  const [textFieldValue, setTextFieldValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('')

  return (
    <div>
      <div style={{ marginBottom: 'var(--p-space-8)' }}>
        <h1 style={{
          fontSize: 'var(--p-font-size-heading-lg)',
          fontWeight: 'var(--p-font-weight-bold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-3) 0'
        }}>
          Forms
        </h1>
        <p style={{
          fontSize: 'var(--p-font-size-body-lg)',
          color: 'var(--p-color-text-secondary)',
          margin: 0
        }}>
          Input fields, selects, checkboxes, and other form controls.
        </p>
      </div>

      {/* Text Fields Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Text Fields
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Text Field Variants
          </h3>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Standard Text Field
            </label>
            <s-text-field
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={textFieldValue}
              on-input={(e) => setTextFieldValue(e.target.value)}
              help-text="We'll use this to contact you"
            />
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Password Field
            </label>
            <s-text-field
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Multiline Text Field
            </label>
            <s-text-field
              label="Description"
              type="text"
              multiline
              rows={4}
              placeholder="Enter a description"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Text Field with Error
            </label>
            <s-text-field
              label="Username"
              type="text"
              placeholder="Enter a username"
              error="Username must be at least 3 characters"
            />
          </div>
        </div>
      </section>

      {/* Select Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Select Dropdowns
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Standard Select
            </label>
            <s-select
              label="Country"
              placeholder="Select a country"
              value={selectValue}
              on-change={(e) => setSelectValue(e.target.value)}
              options={[
                { label: 'United States', value: 'us' },
                { label: 'Canada', value: 'ca' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Australia', value: 'au' },
                { label: 'Germany', value: 'de' }
              ]}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: 'var(--p-font-size-body-md)',
              fontWeight: 'var(--p-font-weight-medium)',
              color: 'var(--p-color-text)',
              marginBottom: 'var(--p-space-2)'
            }}>
              Multi-Select
            </label>
            <s-select
              label="Tags"
              placeholder="Select tags"
              multiple
              options={[
                { label: 'Design', value: 'design' },
                { label: 'Development', value: 'development' },
                { label: 'Marketing', value: 'marketing' },
                { label: 'Sales', value: 'sales' },
                { label: 'Support', value: 'support' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Checkboxes Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Checkboxes
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <s-checkbox
              label="I agree to the terms and conditions"
              checked={checkboxChecked}
              on-change={(e) => setCheckboxChecked(e.target.checked)}
              help-text="You must agree to continue"
            />
          </div>

          <div style={{ marginBottom: 'var(--p-space-4)' }}>
            <s-checkbox
              label="Email me updates"
              checked={true}
              help-text="We'll send you occasional updates about new features"
            />
          </div>

          <div>
            <s-checkbox
              label="Enable notifications"
              checked={true}
              error="This feature is currently unavailable"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Radio Buttons Section */}
      <section style={{ marginBottom: 'var(--p-space-12)' }}>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Radio Buttons
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)',
          marginBottom: 'var(--p-space-6)'
        }}>
          <h3 style={{
            fontSize: 'var(--p-font-size-heading-sm)',
            fontWeight: 'var(--p-font-weight-medium)',
            color: 'var(--p-color-text)',
            margin: '0 0 var(--p-space-4) 0'
          }}>
            Shipping Method
          </h3>

          <div style={{ marginBottom: 'var(--p-space-3)' }}>
            <s-radio-button
              label="Standard Shipping (5-7 days)"
              value="standard"
              name="shipping"
              checked={radioValue === 'standard'}
              on-change={(e) => setRadioValue(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 'var(--p-space-3)' }}>
            <s-radio-button
              label="Express Shipping (2-3 days)"
              value="express"
              name="shipping"
              checked={radioValue === 'express'}
              on-change={(e) => setRadioValue(e.target.value)}
            />
          </div>

          <div>
            <s-radio-button
              label="Overnight Shipping (1 day)"
              value="overnight"
              name="shipping"
              checked={radioValue === 'overnight'}
              on-change={(e) => setRadioValue(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Form Layout */}
      <section>
        <h2 style={{
          fontSize: 'var(--p-font-size-heading-md)',
          fontWeight: 'var(--p-font-weight-semibold)',
          color: 'var(--p-color-text)',
          margin: '0 0 var(--p-space-6) 0'
        }}>
          Form Layout Example
        </h2>

        <div style={{
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border)',
          borderRadius: 'var(--p-border-radius-base)',
          padding: 'var(--p-space-6)'
        }}>
          <form>
            <div style={{ marginBottom: 'var(--p-space-6)' }}>
              <s-text-field
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div style={{ marginBottom: 'var(--p-space-6)' }}>
              <s-text-field
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div style={{ marginBottom: 'var(--p-space-6)' }}>
              <s-select
                label="Role"
                placeholder="Select your role"
                required
                options={[
                  { label: 'Developer', value: 'developer' },
                  { label: 'Designer', value: 'designer' },
                  { label: 'Manager', value: 'manager' },
                  { label: 'Other', value: 'other' }
                ]}
              />
            </div>

            <div style={{ marginBottom: 'var(--p-space-6)' }}>
              <s-text-field
                label="Bio"
                type="text"
                multiline
                rows={3}
                placeholder="Tell us about yourself"
              />
            </div>

            <div style={{ marginBottom: 'var(--p-space-6)' }}>
              <s-checkbox
                label="I agree to the privacy policy"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--p-space-3)' }}>
              <s-button variant="primary" type="submit">
                Submit
              </s-button>
              <s-button variant="secondary" type="button">
                Cancel
              </s-button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default FormsDemo