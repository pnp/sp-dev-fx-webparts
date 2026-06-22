/**
 * Predefined CAML query templates
 */
export const QueryTemplates = {
    "Get items by ID": `<View>
    <Query>
      <Where>
        <In>
            <FieldRef Name="ID" />
            <Values>
                <Value Type="Integer">1</Value>
                <Value Type="Integer">4</Value>
                <Value Type="Integer">6</Value>
                <Value Type="Integer">8</Value>
            </Values>
        </In>
      </Where>
    </Query>
  </View>`,
    "Modified in last 7 days": `<View>
    <Query>
      <Where>
        <Geq>
          <FieldRef Name="Modified" />
          <Value Type="DateTime">
            <Today OffsetDays="-7" />
          </Value>
        </Geq>
      </Where>
      <OrderBy>
        <FieldRef Name="Modified" Ascending="False" />
      </OrderBy>
    </Query>
  </View>`,
    "Top 10 items": `<View>
    <RowLimit>10</RowLimit>
    <Query>
      <OrderBy>
        <FieldRef Name="ID" Ascending="False" />
      </OrderBy>
    </Query>
  </View>`,
    "Created by me": `<View>
    <Query>
      <Where>
        <Eq>
          <FieldRef Name="Author" LookupId="TRUE" />
          <Value Type="Integer"><UserID /></Value>
        </Eq>
      </Where>
    </Query>
  </View>`,
    "Contains text": `<View>
    <Query>
      <Where>
        <Contains>
          <FieldRef Name="Title" />
          <Value Type="Text">Search Text</Value>
        </Contains>
      </Where>
    </Query>
  </View>`,
    "Multiple conditions (AND)": `<View>
    <Query>
      <Where>
        <And>
          <Geq>
            <FieldRef Name="Modified" />
            <Value Type="DateTime">
              <Today OffsetDays="-30" />
            </Value>
          </Geq>
          <Eq>
            <FieldRef Name="ContentType" />
            <Value Type="Text">Document</Value>
          </Eq>
        </And>
      </Where>
    </Query>
  </View>`,
    "Multiple conditions (OR)": `<View>
    <Query>
      <Where>
        <Or>
          <Eq>
            <FieldRef Name="Status" />
            <Value Type="Text">Approved</Value>
          </Eq>
          <Eq>
            <FieldRef Name="Status" />
            <Value Type="Text">Pending</Value>
          </Eq>
        </Or>
      </Where>
    </Query>
  </View>`,
    "Specific fields only": `<View>
    <ViewFields>
      <FieldRef Name="Title" />
      <FieldRef Name="Modified" />
      <FieldRef Name="Editor" />
    </ViewFields>
    <Query>
      <OrderBy>
        <FieldRef Name="Modified" Ascending="False" />
      </OrderBy>
    </Query>
  </View>`
  };