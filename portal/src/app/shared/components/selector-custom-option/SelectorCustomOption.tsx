import styles from './SelectorCustomOption.module.scss';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { GroupBase, OptionProps, components } from 'react-select';
import { AttSelectOption } from '../att-select';
import { algorithmSections } from '../../../components/protocol-query/constants';
import { Button, ButtonActionType, ButtonSize, ButtonStyleType } from '../att-button';
import { SELECTOR_CUSTOM_OPTION_EN } from './translate/en';
import CheckedSvg from '../../../../assets/images/checked.svg';
import UnCheckedSvg from '../../../../assets/images/unchecked.svg';
import CleanSvg from '../../../../assets/images/clean.svg';

const CheckedAriaLabel: string = 'checked';
const CleanAriaLabel: string = 'clean';

type OnEventInputChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
type OnEventHandler = () => void;

export type SelectorCustomOptionProps = OptionProps<AttSelectOption<any>, true, GroupBase<AttSelectOption<any>>> & {
  onOptionChanged: (option: AttSelectOption) => void;
  showInputOption: boolean;
  setShowInputOption: (show: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  setMenuIsOpen: (isOpen: boolean) => void;
};

export const AlgorithmsSelectorCustomOption: React.FC<SelectorCustomOptionProps> = (props: SelectorCustomOptionProps) => {
  const isSectionTitle = algorithmSections.includes((props.data as AttSelectOption).value);
  const optionStyle = isSectionTitle ? styles.algorithms_input_option_title : styles.algorithms_input_option;

  return (
    <components.Option {...props}>
      <div className={styles.option_wrapper}>
        <input
          id={props.label}
          type="checkbox"
          className={styles.input_option}
          checked={props.isSelected}
          onChange={() => props.onOptionChanged}
        />
        <img className={optionStyle} src={props.isSelected ? CheckedSvg : UnCheckedSvg} alt={CheckedAriaLabel} />
      </div>
      <span className={optionStyle}>{props.label}</span>
    </components.Option>
  );
};

export const IterationsSelectorCustomOption: React.FC<SelectorCustomOptionProps> = (props: SelectorCustomOptionProps) => {
  return (
    <>
      {!props.data.metadata && (
        <components.Option {...props}>
          <div className={styles.option_wrapper}>
            <input
              id={props.label}
              type="checkbox"
              className={cn(styles.iterations_input_option, styles.input_option)}
              checked={props.isSelected}
              onChange={() => props.onOptionChanged}
            />
            <img src={props.isSelected ? CheckedSvg : UnCheckedSvg} alt={CheckedAriaLabel} />
          </div>
          <span>{props.label}</span>
        </components.Option>
      )}
      <CustomInput {...props} />
    </>
  );
};

export const CustomInput: React.FC<SelectorCustomOptionProps> = (props: SelectorCustomOptionProps) => {
  const { showInputOption, setShowInputOption, inputValue, setInputValue, setMenuIsOpen } = props;
  const inputOption = useMemo<AttSelectOption>(() => ({ label: inputValue, value: inputValue, metadata: { isInput: true } }), [inputValue]);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInputOptionExists = (props.options as AttSelectOption[]).some((option: AttSelectOption) => option.metadata?.isInput);

  const handleInputChange: OnEventInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (isNaN(Number(newValue))) {
      props.selectOption(inputOption as AttSelectOption);
    }
  };

  const applyCustomOption: OnEventHandler = useCallback((): void => {
    delete props.data.metadata;
    setShowInputOption(false);
    setTimeout(() => props.selectOption({ label: inputOption.label, value: inputOption.value }), 0);
  }, [props, setShowInputOption, inputOption]);

  useEffect(() => {
    if (showInputOption && props.data.metadata?.isInput) {
      inputRef.current?.focus();
      props.data.label = props.data.value = inputValue;
    }
  }, [showInputOption, props.data, inputValue]);

  useEffect(() => {
    const currentOptionsSelected = (props.getValue() ?? []).map((option: AttSelectOption) => option.label);
    const lastOptionSelected = currentOptionsSelected[currentOptionsSelected.length - 1];

    // handles deselection when the user selects the input option and then selects another option
    if (currentOptionsSelected.includes(inputOption.label) && lastOptionSelected !== inputOption.label && props.data.metadata?.isInput) {
      props.selectOption(inputOption as AttSelectOption);
    }
    // handles deselection when the user selects the input option and then types a wrong value
    if (lastOptionSelected === inputOption.label && isNaN(Number(inputValue))) {
      props.selectOption(inputOption as AttSelectOption);
    }
  }, [props, inputOption, inputValue]);

  return (
    <>
      {showInputOption && props.data.metadata?.isInput && (
        <components.Option {...props}>
          <div className={styles.add_new_wrapper}>
            <div className={styles.add_new_checkbox_wrapper}>
              <input
                id={props.label}
                type="checkbox"
                className={cn(styles.iterations_input_option, styles.input_option)}
                checked={props.isSelected}
                onChange={() => props.onOptionChanged}
              />
              <img src={props.isSelected ? CheckedSvg : UnCheckedSvg} alt={CheckedAriaLabel} />
            </div>
            <div className={styles.input_wrapper}>
              <input
                id={props.label}
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setMenuIsOpen(true)}
                className={styles.add_new_input_option}
                disabled={!props.isSelected}
              />
              {inputValue !== '' && (
                <>
                  <img
                    className={styles.clean_icon}
                    onClick={() => setInputValue('')}
                    src={CleanSvg}
                    alt={CleanAriaLabel}
                    tabIndex={props.isSelected ? 0 : -1}
                  />
                  <Button
                    className={styles.add_button}
                    ariaLabel={props.label}
                    size={ButtonSize.NONE}
                    styleType={ButtonStyleType.WRAPPER}
                    actionType={ButtonActionType.SUBMIT}
                    onButtonClick={applyCustomOption}
                    disabled={!props.isSelected || isNaN(Number(inputValue))}
                  >{SELECTOR_CUSTOM_OPTION_EN.ADD_BUTTON}</Button>
                </>
              )}

            </div>
          </div>
        </components.Option>
      )}
      {props.data.metadata?.isAddNewButton && isInputOptionExists && (
        <Button
          className={styles.add_new_button}
          ariaLabel={props.label}
          size={ButtonSize.NONE}
          styleType={ButtonStyleType.WRAPPER}
          actionType={ButtonActionType.BUTTON}
          onButtonClick={() => setShowInputOption(true)}
          disabled={showInputOption}
        >{props.label}</Button>
      )}
    </>
  );
}