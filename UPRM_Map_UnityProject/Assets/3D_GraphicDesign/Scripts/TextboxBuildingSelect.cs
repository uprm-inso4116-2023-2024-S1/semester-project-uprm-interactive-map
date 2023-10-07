using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEngine;

public class TextboxBuildingSelect : MonoBehaviour
{
    [HideInInspector]
    public TMP_InputField textField;

    public SelectionManager SelectionManager;
    void Awake()
    {
        textField = GetComponent<TMP_InputField>();
    }

    public void SelectFromTextbox()
    {
        if (String.IsNullOrEmpty(textField.text))
        {
            SelectionManager.DeselectAllBuildings();
            return;
        }
        SelectionManager.MakeBuildingSelected(textField.text);
    }
}
