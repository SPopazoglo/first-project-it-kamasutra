import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="samurai" />)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('samurai')
  })

  test('after creation <span> should be displayed', () => {
    const component = create(<ProfileStatus status="samurai" />)
    const root = component.root
    let span = root.findByType('span')
    expect(span).not.toBeNull()
  })

  test("after creation <input> should'nt be displayed", () => {
    const component = create(<ProfileStatus status="samurai" />)
    const root = component.root

    expect(() => {
      let input = root.findByType('input')
    }).toThrow()
  })

  test('after creation <span> should contains correct status', () => {
    const component = create(<ProfileStatus status="samurai" />)
    const root = component.root
    let span = root.findByType('span')
    expect(span.children[0]).toBe('samurai')
  })

  test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status="samurai" />)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.props.value).toBe('samurai')
  })

  test('collback should be called', () => {
    const mockCallback = jest.fn()
    const component = create(
      <ProfileStatus status="samurai" updateStatus={mockCallback} />
    )
    const instance = component.getInstance()
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
